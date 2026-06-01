import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"
import axios from "axios"
import { CheckCircle2, PawPrint, Save } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  buscarUsuarioPorId,
  criarAdocao,
  criarContato,
  criarPet,
  getDomainText,
  type BackendContato,
  type DomainValue,
} from "@/lib/anuncios-service"
import {
  listarEspecies,
  listarPortes,
  listarSexos,
  listarTemperamentos,
} from "@/lib/dominios-service"
import { getLoggedUser } from "@/lib/session"

type FormState = {
  petNome: string
  especieId: string
  porteId: string
  sexoId: string
  raca: string
  cor: string
  idade: string
  temperamentoId: string
  descricao: string
  vacinas: string
  dataVacina: string
  conviveCriancas: boolean
  convivePets: boolean
  desmamado: boolean
  vacinado: boolean
  vermifugado: boolean
  castrado: boolean
  contatoNome: string
  contatoEmail: string
  contatoTelefone: string
  contatoCidade: string
  contatoUf: string
}

const initialForm: FormState = {
  petNome: "",
  especieId: "",
  porteId: "",
  sexoId: "",
  raca: "",
  cor: "",
  idade: "",
  temperamentoId: "",
  descricao: "",
  vacinas: "",
  dataVacina: "",
  conviveCriancas: false,
  convivePets: false,
  desmamado: false,
  vacinado: false,
  vermifugado: false,
  castrado: false,
  contatoNome: "",
  contatoEmail: "",
  contatoTelefone: "",
  contatoCidade: "",
  contatoUf: "",
}

function domainRef(id: string) {
  return id ? { id: Number(id) } : null
}

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.mensagem ??
      error.response?.data?.message ??
      fallback
    )
  }

  return fallback
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: DomainValue[]
  placeholder: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="font-semibold text-white">{label}</Label>
      <Select value={value} onValueChange={(nextValue) => onChange(nextValue ?? "")}>
        <SelectTrigger className="w-full border-gray-900 bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={String(option.id)}>
              {getDomainText(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-white/30 bg-white/10 p-3 text-sm font-semibold text-white">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onChange(Boolean(value))}
      />
      {label}
    </label>
  )
}

export default function NewAdoption() {
  const navigate = useNavigate()
  const loggedUser = useMemo(() => getLoggedUser(), [])
  const [form, setForm] = useState<FormState>(initialForm)
  const [especies, setEspecies] = useState<DomainValue[]>([])
  const [portes, setPortes] = useState<DomainValue[]>([])
  const [sexos, setSexos] = useState<DomainValue[]>([])
  const [temperamentos, setTemperamentos] = useState<DomainValue[]>([])
  const [existingContatoId, setExistingContatoId] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadPageData() {
      const [especiesData, portesData, sexosData, temperamentosData] =
        await Promise.all([
          listarEspecies(),
          listarPortes(),
          listarSexos(),
          listarTemperamentos(),
        ])

      setEspecies(especiesData)
      setPortes(portesData)
      setSexos(sexosData)
      setTemperamentos(temperamentosData)

      if (loggedUser?.id) {
        const usuario = await buscarUsuarioPorId(loggedUser.id)
        const contato = usuario.contato

        setExistingContatoId(contato?.id ?? null)
        setForm((current) => ({
          ...current,
          contatoNome: contato?.nome ?? usuario.nome ?? loggedUser.nome,
          contatoEmail: contato?.email ?? loggedUser.email ?? "",
          contatoTelefone: contato?.numeroCelular ?? "",
          contatoCidade: contato?.cidade ?? "",
          contatoUf: contato?.uf ?? usuario.ufUsuario ?? loggedUser.ufUsuario ?? "",
        }))
      }
    }

    loadPageData().catch(() =>
      setError("Nao foi possivel carregar os dados do formulario.")
    )
  }, [loggedUser])

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function requireFields() {
    const required: Array<keyof FormState> = [
      "petNome",
      "especieId",
      "porteId",
      "sexoId",
      "contatoNome",
      "contatoEmail",
      "contatoTelefone",
      "contatoCidade",
      "contatoUf",
    ]

    return required.every((field) => String(form[field]).trim())
  }

  async function resolveContato() {
    if (existingContatoId) {
      return { id: existingContatoId }
    }

    const contato: BackendContato = {
      nome: form.contatoNome,
      email: form.contatoEmail,
      numeroCelular: form.contatoTelefone.replace(/\D/g, ""),
      cidade: form.contatoCidade,
      uf: form.contatoUf.toUpperCase(),
    }

    return criarContato(contato)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!loggedUser?.id) {
      setError("Faca login para cadastrar um anuncio.")
      return
    }

    if (!requireFields()) {
      setError("Preencha os campos obrigatorios antes de salvar.")
      return
    }

    try {
      setIsSaving(true)

      const [pet, contato] = await Promise.all([
        criarPet({
          nome: form.petNome,
          especie: domainRef(form.especieId),
          porte: domainRef(form.porteId),
          sexo: domainRef(form.sexoId),
          raca: form.raca || null,
          cor: form.cor || null,
          idade: form.idade ? Number(form.idade) : null,
        }),
        resolveContato(),
      ])

      const anuncio = await criarAdocao({
        usuario: { id: loggedUser.id },
        status: { id: 1 },
        pet: { id: pet.id },
        contato: { id: contato.id },
        temperamento: domainRef(form.temperamentoId),
        conviveCriancas: form.conviveCriancas,
        convivePets: form.convivePets,
        desmamado: form.desmamado,
        vacinado: form.vacinado,
        vermifugado: form.vermifugado,
        castrado: form.castrado,
        vacinas: form.vacinas || null,
        dataVacina: form.dataVacina || null,
        descricao: form.descricao || null,
      })

      navigate(`/app/adoption/${anuncio.id}`)
    } catch (submitError) {
      setError(
        getErrorMessage(submitError, "Nao foi possivel cadastrar a adocao.")
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-white">
          <span className="subtitle">Cadastrar adocao</span>
        </h1>

      </div>

      {error && (
        <div className="rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Card className="border-2 border-gray-900 shadow-2xl backdrop-blur-md">
          <CardContent className="grid gap-8 p-6">
            <section className="grid gap-4">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                <PawPrint className="size-6" />
                Dados do pet
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">Nome *</Label>
                  <Input
                    value={form.petNome}
                    onChange={(event) =>
                      updateField("petNome", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                    placeholder="Nome do pet"
                  />
                </div>
                <SelectField
                  label="Especie *"
                  value={form.especieId}
                  onChange={(value) => updateField("especieId", value)}
                  options={especies}
                  placeholder="Selecione"
                />
                <SelectField
                  label="Porte *"
                  value={form.porteId}
                  onChange={(value) => updateField("porteId", value)}
                  options={portes}
                  placeholder="Selecione"
                />
                <SelectField
                  label="Sexo *"
                  value={form.sexoId}
                  onChange={(value) => updateField("sexoId", value)}
                  options={sexos}
                  placeholder="Selecione"
                />
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">Raca</Label>
                  <Input
                    value={form.raca}
                    onChange={(event) => updateField("raca", event.target.value)}
                    className="border-gray-900 bg-white"
                    placeholder="SRD, poodle..."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">Cor</Label>
                  <Input
                    value={form.cor}
                    onChange={(event) => updateField("cor", event.target.value)}
                    className="border-gray-900 bg-white"
                    placeholder="Caramelo, preto..."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">Idade</Label>
                  <Input
                    min={0}
                    type="number"
                    value={form.idade}
                    onChange={(event) =>
                      updateField("idade", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                    placeholder="Anos"
                  />
                </div>
                <SelectField
                  label="Temperamento"
                  value={form.temperamentoId}
                  onChange={(value) => updateField("temperamentoId", value)}
                  options={temperamentos}
                  placeholder="Selecione"
                />
                <div className="flex flex-col gap-2 md:col-span-3">
                  <Label className="font-semibold text-white">Descricao</Label>
                  <Input
                    value={form.descricao}
                    onChange={(event) =>
                      updateField("descricao", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                    placeholder="Conte um pouco sobre o pet"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-4">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
                <CheckCircle2 className="size-6" />
                Saude e convivencia
              </h2>
              <div className="grid gap-3 md:grid-cols-3">
                <ToggleField
                  label="Convive com criancas"
                  checked={form.conviveCriancas}
                  onChange={(value) => updateField("conviveCriancas", value)}
                />
                <ToggleField
                  label="Convive com pets"
                  checked={form.convivePets}
                  onChange={(value) => updateField("convivePets", value)}
                />
                <ToggleField
                  label="Desmamado"
                  checked={form.desmamado}
                  onChange={(value) => updateField("desmamado", value)}
                />
                <ToggleField
                  label="Vacinado"
                  checked={form.vacinado}
                  onChange={(value) => updateField("vacinado", value)}
                />
                <ToggleField
                  label="Vermifugado"
                  checked={form.vermifugado}
                  onChange={(value) => updateField("vermifugado", value)}
                />
                <ToggleField
                  label="Castrado"
                  checked={form.castrado}
                  onChange={(value) => updateField("castrado", value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">Vacinas</Label>
                  <Input
                    value={form.vacinas}
                    onChange={(event) =>
                      updateField("vacinas", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                    placeholder="V10, antirrabica..."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">
                    Data da vacina
                  </Label>
                  <Input
                    type="date"
                    value={form.dataVacina}
                    onChange={(event) =>
                      updateField("dataVacina", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-4">
              <h2 className="text-2xl font-bold text-white">Contato</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">Nome *</Label>
                  <Input
                    value={form.contatoNome}
                    onChange={(event) =>
                      updateField("contatoNome", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">Email *</Label>
                  <Input
                    type="email"
                    value={form.contatoEmail}
                    onChange={(event) =>
                      updateField("contatoEmail", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">Telefone *</Label>
                  <Input
                    value={form.contatoTelefone}
                    onChange={(event) =>
                      updateField("contatoTelefone", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <Label className="font-semibold text-white">Cidade *</Label>
                  <Input
                    value={form.contatoCidade}
                    onChange={(event) =>
                      updateField("contatoCidade", event.target.value)
                    }
                    className="border-gray-900 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-semibold text-white">UF *</Label>
                  <Input
                    maxLength={2}
                    value={form.contatoUf}
                    onChange={(event) =>
                      updateField("contatoUf", event.target.value.toUpperCase())
                    }
                    className="border-gray-900 bg-white uppercase"
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-orange-100"
                onClick={() => navigate("/app/adoption")}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="border-2 border-gray-900 bg-primary hover:bg-orange-600"
              >
                <Save className="size-4" />
                {isSaving ? "Salvando..." : "Cadastrar"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
