import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api } from "@/lib/api"
import BackgroundLayout from "@/layouts/BackgroundLayout"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import type { FormEvent } from "react"

const ufs = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

export function Register() {
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [celular, setCelular] = useState("")
  const [uf, setUf] = useState("")
  const [cidade, setCidade] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmacao, setConfirmacao] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (senha !== confirmacao) {
      setError("As senhas nao coincidem.")
      return
    }

    if (!uf) {
      setError("Selecione o estado.")
      return
    }

    setIsSubmitting(true)

    try {
      await api.post("/usuarios", {
        nome: nome.trim(),
        senhaHash: senha,
        ufUsuario: uf,
        contato: {
          nome: nome.trim(),
          cidade: cidade.trim(),
          uf,
          numeroCelular: celular,
          email: email.trim(),
        },
      })

      navigate("/login", {
        state: {
          message: "Cadastro realizado. Entre com seu e-mail e senha.",
        },
      })
    } catch {
      setError("Nao foi possivel cadastrar. Verifique os dados informados.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BackgroundLayout>
      <h1 className="title mb-2 self-center">Cadastro</h1>
      <Card className="w-2xl self-center border-2 border-gray-900 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <Label className="w-24 text-xl font-semibold text-white">
              Nome
            </Label>
            <Input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="border-gray-900 bg-white"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <Label className="w-24 text-xl font-semibold text-white">
              E-mail
            </Label>
            <Input
              type="email"
              placeholder="email_exemplo@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-gray-900 bg-white"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <Label className="w-24 text-xl font-semibold text-white">
              Celular
            </Label>
            <Input
              inputMode="numeric"
              maxLength={11}
              placeholder="16999999999"
              value={celular}
              onChange={(event) =>
                setCelular(event.target.value.replace(/\D/g, ""))
              }
              className="border-gray-900 bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-[6rem_12rem_6rem_1fr] items-center gap-4">
            <Label className="text-xl font-semibold text-white">Estado</Label>
            <Select value={uf} onValueChange={(value) => setUf(value)}>
              <SelectTrigger className="w-full border-gray-900 bg-white">
                <SelectValue placeholder="UF" />
              </SelectTrigger>
              <SelectContent>
                {ufs.map((sigla) => (
                  <SelectItem key={sigla} value={sigla}>
                    {sigla}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label className="text-xl font-semibold text-white">Cidade</Label>
            <Input
              type="text"
              placeholder="Sua cidade"
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
              className="border-gray-900 bg-white"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <Label className="w-24 text-xl font-semibold text-white">
              Senha
            </Label>
            <Input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="border-gray-900 bg-white"
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <Label className="w-32 text-xl font-semibold text-white">
              Confirmar
            </Label>
            <Input
              type="password"
              placeholder="Repita a senha"
              value={confirmacao}
              onChange={(event) => setConfirmacao(event.target.value)}
              className="border-gray-900 bg-white"
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm font-semibold text-white">
              {error}
            </p>
          )}

          <div className="flex justify-evenly pt-4">
            <Link to="/login">
              <Button
                type="button"
                className="border-2 border-gray-900 px-10 py-2 text-lg hover:bg-orange-400"
              >
                Voltar
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>

        <div className="space-y-2 text-center">
          <Link to="/recoverpass">
            <span className="cursor-pointer text-white underline">
              Esqueceu a senha?
            </span>
          </Link>
        </div>
      </Card>
    </BackgroundLayout>
  )
}
