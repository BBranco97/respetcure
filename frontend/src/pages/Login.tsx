import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import type { FormEvent } from "react"

import BackgroundLayout from "@/layouts/BackgroundLayout"

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage =
    (location.state as { message?: string } | null)?.message ?? ""
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const response = await api.post("/usuarios/login", {
        email,
        senha,
      })

      localStorage.setItem("usuarioLogado", JSON.stringify(response.data))
      navigate("/app")
    } catch {
      setError("E-mail ou senha invalidos.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <BackgroundLayout>
      <h1 className="title mb-2 self-center">Login</h1>
      <Card className="w-125 self-center border-2 border-gray-900 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
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

          {/* Senha */}
          <div className="flex items-center gap-4">
            <Label className="w-24 text-xl font-semibold text-white">
              Senha
            </Label>
            <Input
              type="password"
              placeholder="Insira uma senha..."
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="border-gray-900 bg-white"
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm font-semibold text-white">
              {error}
            </p>
          )}

          {!error && successMessage && (
            <p className="text-center text-sm font-semibold text-white">
              {successMessage}
            </p>
          )}

          {/* Botao */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>

        {/* Links */}
        <div className="space-y-2 text-center">
          <Link to="/recoverpass">
            <span className="cursor-pointer text-white underline">
              Esqueceu a senha?
            </span>
          </Link>
          <p className="text-white">
            Nao tem conta?{" "}
            <Link to="/register">
              <span className="cursor-pointer text-white underline">
                Cadastre-se
              </span>
            </Link>
          </p>
        </div>
      </Card>
    </BackgroundLayout>
  )
}
