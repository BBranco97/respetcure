import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import BackgroundLayout from "@/layouts/BackgroundLayout"
import { api } from "@/lib/api"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function PhoneInput({ ddd, setDdd, phone, setPhone, error, readOnly = false }: {
  ddd: string
  setDdd: (val: string) => void
  phone: string
  setPhone: (val: string) => void
  error?: string
  readOnly?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <Label className="w-24 text-xl font-semibold text-white">Celular</Label>
        <div className="flex items-center">
          <Input
            placeholder="(99)"
            maxLength={2}
            value={ddd}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              setDdd(value)
            }}
            className={`mr-1 w-16 border-gray-900 bg-white text-center ${readOnly ? "opacity-50" : "opacity-100"} ${error ? "border-red-500" : ""}`}
            readOnly={readOnly}
          />
          <Input
            placeholder="99999-9999"
            value={phone}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "")
              if (value.length > 5) {
                value = value.replace(/(\d{5})(\d+)/, "$1-$2")
              }
              setPhone(value)
            }}
            className={`w-40 border-gray-900 bg-white ${readOnly ? "opacity-50" : "opacity-100"} ${error ? "border-red-500" : ""}`}
            readOnly={readOnly}
          />
        </div>
      </div>
      {error && <span className="ml-24 text-sm text-red-500">{error}</span>}
    </div>
  )
}

export function LocationSelect({
  selectedUf,
  setSelectedUf,
  selectedCidade,
  setSelectedCidade,
  error,
  readOnly = false,
}: {
  selectedUf: string
  setSelectedUf: (val: string) => void
  selectedCidade: string
  setSelectedCidade: (val: string) => void
  error?: string
  readOnly?: boolean
}) {
  interface Uf {
    sigla: string
    nome: string
  }

  interface Cidade {
    id: number
    nome: string
  }

  const [ufs, setUfs] = useState<Uf[]>([])
  const [cidades, setCidades] = useState<Cidade[]>([])

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data: Uf[]) => setUfs(data))
  }, [])

  useEffect(() => {
    if (selectedUf) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
        .then((res) => res.json())
        .then((data: Cidade[]) => setCidades(data))
    }
  }, [selectedUf])

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-4">
        <Label className="w-24 text-xl font-semibold text-white">Estado</Label>
        <Select
          onValueChange={(value) => {
            setSelectedUf(value as string)
            setSelectedCidade("")
          }}
          value={selectedUf}
          disabled={readOnly}
        >
          <SelectTrigger className={`w-48 border-gray-900 bg-white ${error ? "border-red-500" : ""}`}>
            <SelectValue placeholder="Selecione o Estado" />
          </SelectTrigger>
          <SelectContent>
            {ufs.map((Uf) => (
              <SelectItem key={Uf.sigla} value={Uf.sigla}>
                {Uf.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className="ml-5 w-24 text-xl font-semibold text-white">
          Cidade
        </Label>
        <Select
          disabled={readOnly || !selectedUf}
          onValueChange={(value) => setSelectedCidade(value as string)}
          value={selectedCidade}
        >
          <SelectTrigger className={`border-gray-900 bg-white ${error ? "border-red-500" : ""}`}>
            <SelectValue placeholder="Selecione a cidade" />
          </SelectTrigger>
          <SelectContent>
            {cidades.map((cidade) => (
              <SelectItem key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <span className="text-sm text-red-500 ml-24">{error}</span>}
    </div>
  )
}



export function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [ddd, setDdd] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedUf, setSelectedUf] = useState("")
  const [selectedCidade, setSelectedCidade] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userImage, setUserImage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const navigate = useNavigate()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUserImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {}

    if (!name) newErrors.name = "O nome é obrigatório."
    if (!email) newErrors.email = "O e-mail é obrigatório."
    if (!ddd || !phone) newErrors.phone = "O telefone é obrigatório."
    if (!selectedUf || !selectedCidade)
      newErrors.location = "A localização é obrigatória."
    if (!password)
      newErrors.password = "A senha é obrigatória."
    if (!confirmPassword)
      newErrors.confirmPassword =
          "A confirmação de senha é obrigatória."
    if (password !== confirmPassword)
      newErrors.confirmPassword =
          "As senhas não coincidem."

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0)
      return

    try {

      await api.post(
          "/usuarios",
          {
            nome: name,
            senhaHash: password,
            ufUsuario: selectedUf,

            contato: {
              nome: name,
              cidade: selectedCidade,
              uf: selectedUf,
              numeroCelular:
                  ddd + phone.replace("-", ""),
              email: email
            }
          }
      )

      alert(
          "Cadastro realizado com sucesso!"
      )

      navigate("/login")

    }
    catch (error) {

      if (axios.isAxiosError(error)) {

        alert(
            error.response?.data?.mensagem ??
            "Erro ao cadastrar usuário."
        )

        return
      }

      alert(
          "Erro ao cadastrar usuário."
      )
    }
  }

  return (
    <BackgroundLayout>
      <h1 className="title mb-2 self-center">Cadastro</h1>
      <div className="flex items-center justify-center gap-8 self-center">
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-900 bg-gray-200">
            {userImage ? (
              <img src={userImage} alt="User" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-600">
                <span className="text-4xl font-bold">+</span>
              </div>
            )}
          </div>
          <label className="mt-2 cursor-pointer text-sm font-semibold text-white hover:underline">
            Alterar Imagem
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <Card className="w-2xl border-2 border-gray-900 p-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Label className="w-24 text-xl font-semibold text-white">Nome</Label>
              <Input
                type="text"
                placeholder="Seu nome"
                className={`border-gray-900 bg-white ${errors.name ? "border-red-500" : ""}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
                }}
              />
            </div>
            {errors.name && <span className="text-sm text-red-500 ml-24">{errors.name}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Label className="w-24 text-xl font-semibold text-white">
                E-mail
              </Label>
              <Input
                type="email"
                placeholder="email_exemplo@gmail.com"
                className={`border-gray-900 bg-white ${errors.email ? "border-red-500" : ""}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors(prev => ({ ...prev, email: "" }))
                }}
              />
            </div>
            {errors.email && <span className="text-sm text-red-500 ml-24">{errors.email}</span>}
          </div>

          <PhoneInput
            ddd={ddd}
            setDdd={setDdd}
            phone={phone}
            setPhone={setPhone}
            error={errors.phone}
          />

          <LocationSelect
            selectedUf={selectedUf}
            setSelectedUf={setSelectedUf}
            selectedCidade={selectedCidade}
            setSelectedCidade={setSelectedCidade}
            error={errors.location}
          />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Label className="w-24 text-xl font-semibold text-white">Senha</Label>
              <Input
                type="password"
                placeholder="Sua senha"
                className={`border-gray-900 bg-white ${errors.password ? "border-red-500" : ""}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors(prev => ({ ...prev, password: "" }))
                }}
              />
            </div>
            {errors.password && <span className="text-sm text-red-500 ml-24">{errors.password}</span>}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Label className="w-32 text-xl font-semibold text-white">
                Confirme sua Senha
              </Label>
              <Input
                type="password"
                placeholder="Confirme sua senha"
                className={`border-gray-900 bg-white ${errors.confirmPassword ? "border-red-500" : ""}`}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: "" }))
                }}
              />
            </div>
            {errors.confirmPassword && <span className="text-sm text-red-500 ml-24">{errors.confirmPassword}</span>}
          </div>

          <div className="flex justify-evenly pt-4">
            <Link to="/login">
              <Button className="border-2 border-gray-900 px-10 py-2 text-lg hover:bg-orange-400">
                Voltar
              </Button>
            </Link>
            <Button
              className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
              onClick={handleSubmit}
            >
              Cadastrar
            </Button>
          </div>

          <div className="space-y-2 text-center">
            <Link to="/recoverpass">
              <span className="cursor-pointer text-white underline">
                Esqueceu a senha?
              </span>
            </Link>
          </div>
        </Card>
      </div>
    </BackgroundLayout>
  )
}
