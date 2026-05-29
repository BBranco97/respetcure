import { useEffect, useState } from "react"
import { HeartHandshake, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { DomainValue } from "@/lib/anuncios-service"
import {
  listarEspecies,
  listarPortes,
  listarSexos,
  listarTemperamentos,
} from "@/lib/dominios-service"
import {
  atualizarPerfilAdocao,
  buscarPerfilAdocaoPorUsuario,
  criarPerfilAdocao,
  type AdoptionProfileData,
  type AdoptionProfilePayload,
} from "@/lib/perfil-adocao-service"
import { getLoggedUser } from "@/lib/session"

type SelectFieldProps = {
  label: string
  value: string
  placeholder: string
  options: DomainValue[]
  onChange: (value: string) => void
  required?: boolean
}

function SelectField({
  label,
  value,
  placeholder,
  options,
  onChange,
  required = false,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-white">
        {label}
        {required ? " *" : ""}
      </Label>
      <Select value={value} onValueChange={(nextValue) => onChange(nextValue ?? "")}>
        <SelectTrigger className="w-full border-gray-900 bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              {option.descricao ?? option.nome ?? option.id}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default function AdoptionProfile() {
  const loggedUser = getLoggedUser()
  const [profile, setProfile] = useState<AdoptionProfileData | null>(null)
  const [especies, setEspecies] = useState<DomainValue[]>([])
  const [portes, setPortes] = useState<DomainValue[]>([])
  const [sexos, setSexos] = useState<DomainValue[]>([])
  const [temperamentos, setTemperamentos] = useState<DomainValue[]>([])
  const [especieId, setEspecieId] = useState("")
  const [porteId, setPorteId] = useState("")
  const [sexoId, setSexoId] = useState("")
  const [temperamentoId, setTemperamentoId] = useState("")
  const [idadeMin, setIdadeMin] = useState("")
  const [idadeMax, setIdadeMax] = useState("")
  const [possuiCrianca, setPossuiCrianca] = useState(false)
  const [possuiPet, setPossuiPet] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  function fillProfileFields(data: AdoptionProfileData) {
    setProfile(data)
    setEspecieId(data.especie?.id ? String(data.especie.id) : "")
    setPorteId(data.porte?.id ? String(data.porte.id) : "")
    setSexoId(data.sexo?.id ? String(data.sexo.id) : "")
    setTemperamentoId(
      data.temperamento?.id ? String(data.temperamento.id) : ""
    )
    setIdadeMin(data.idadeMin != null ? String(data.idadeMin) : "")
    setIdadeMax(data.idadeMax != null ? String(data.idadeMax) : "")
    setPossuiCrianca(Boolean(data.possuiCrianca))
    setPossuiPet(Boolean(data.possuiPet))
  }

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const [especiesData, portesData, sexosData, temperamentosData] =
          await Promise.all([
            listarEspecies(),
            listarPortes(),
            listarSexos(),
            listarTemperamentos(),
          ])

        if (!isMounted) {
          return
        }

        setEspecies(especiesData)
        setPortes(portesData)
        setSexos(sexosData)
        setTemperamentos(temperamentosData)

        if (loggedUser?.id) {
          try {
            const profileData = await buscarPerfilAdocaoPorUsuario(loggedUser.id)

            if (isMounted) {
              fillProfileFields(profileData)
            }
          } catch {
            if (isMounted) {
              setProfile(null)
            }
          }
        }
      } catch {
        if (isMounted) {
          setError("Nao foi possivel carregar os dados do perfil de adocao.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [loggedUser?.id])

  async function handleSave() {
    setError("")
    setMessage("")

    if (!loggedUser?.id) {
      setError("Faca login para criar seu perfil de adocao.")
      return
    }

    if (!especieId || !porteId) {
      setError("Especie e porte sao obrigatorios.")
      return
    }

    const minAge = idadeMin ? Number(idadeMin) : null
    const maxAge = idadeMax ? Number(idadeMax) : null

    if (minAge != null && maxAge != null && maxAge < minAge) {
      setError("Idade maxima deve ser maior ou igual a idade minima.")
      return
    }

    const payload: AdoptionProfilePayload = {
      usuario: { id: loggedUser.id },
      especie: { id: Number(especieId) },
      porte: { id: Number(porteId) },
      idadeMin: minAge,
      idadeMax: maxAge,
      temperamento: temperamentoId ? { id: Number(temperamentoId) } : null,
      sexo: sexoId ? { id: Number(sexoId) } : null,
      possuiCrianca,
      possuiPet,
    }

    try {
      setIsSaving(true)
      const savedProfile = profile?.id
        ? await atualizarPerfilAdocao(profile.id, payload)
        : await criarPerfilAdocao(payload)

      fillProfileFields(savedProfile)
      setMessage("Perfil de adocao salvo com sucesso.")
    } catch {
      setError("Erro ao salvar o perfil de adocao.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          <span className="subtitle">Perfil de Adocao</span>
        </h1>
        <p className="text-white/80">
          Defina suas preferencias para facilitar a combinacao com pets.
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-md border border-green-800 bg-green-100 p-4 text-green-800">
          {message}
        </div>
      )}

      <Card className="border-2 border-gray-900 shadow-2xl backdrop-blur-md">
        <CardContent className="p-6">
          {isLoading ? (
            <Skeleton className="h-96 w-full" />
          ) : (
            <div className="grid gap-6">
              <div className="flex items-center gap-3 rounded-md bg-white p-4 text-gray-900">
                <HeartHandshake className="size-8 text-orange-700" />
                <div>
                  <p className="text-xl font-bold">
                    {profile ? "Perfil existente" : "Novo perfil"}
                  </p>
                  <p className="text-gray-600">
                    {loggedUser?.nome ?? "Usuario nao identificado"}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <SelectField
                  label="Especie"
                  value={especieId}
                  placeholder="Selecione uma especie"
                  options={especies}
                  onChange={setEspecieId}
                  required
                />
                <SelectField
                  label="Porte"
                  value={porteId}
                  placeholder="Selecione um porte"
                  options={portes}
                  onChange={setPorteId}
                  required
                />
                <SelectField
                  label="Sexo"
                  value={sexoId}
                  placeholder="Qualquer sexo"
                  options={sexos}
                  onChange={setSexoId}
                />
                <SelectField
                  label="Temperamento"
                  value={temperamentoId}
                  placeholder="Qualquer temperamento"
                  options={temperamentos}
                  onChange={setTemperamentoId}
                />
                <div className="flex flex-col gap-2">
                  <Label className="text-white">Idade minima</Label>
                  <Input
                    type="number"
                    min={0}
                    value={idadeMin}
                    onChange={(event) => setIdadeMin(event.target.value)}
                    className="border-gray-900 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white">Idade maxima</Label>
                  <Input
                    type="number"
                    min={0}
                    value={idadeMax}
                    onChange={(event) => setIdadeMax(event.target.value)}
                    className="border-gray-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-3 rounded-md bg-white p-4 font-semibold text-gray-900">
                  <input
                    type="checkbox"
                    checked={possuiCrianca}
                    onChange={(event) => setPossuiCrianca(event.target.checked)}
                    className="size-4"
                  />
                  Tenho crianca em casa
                </label>
                <label className="flex items-center gap-3 rounded-md bg-white p-4 font-semibold text-gray-900">
                  <input
                    type="checkbox"
                    checked={possuiPet}
                    onChange={(event) => setPossuiPet(event.target.checked)}
                    className="size-4"
                  />
                  Tenho outro pet em casa
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  className="border-2 border-gray-900 bg-primary px-8 hover:bg-orange-600"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="mr-2 size-4" />
                  {isSaving ? "Salvando..." : "Salvar perfil"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
