import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import BackgroundLayout from "@/layouts/BackgroundLayout"
import { useState } from "react"
import { api } from "@/lib/api"
import axios from "axios"
import { saveLoggedUser } from "@/lib/session"

export function Login() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const response = await api.post(
          "/usuarios/login",
          {
            email,
            senha
          }
      )

      console.log(response.data)
      saveLoggedUser(response.data)

      alert("Login realizado com sucesso!")

      navigate("/app")

    } catch (error) {

      if (axios.isAxiosError(error)) {

        alert(
            error.response?.data?.message ??
            "Email ou senha inválidos."
        )

        return
      }

      alert("Erro ao realizar login.")
    }
  }

  return (
      <BackgroundLayout>
        <h1 className="title mb-2 self-center">Login</h1>

        <Card className="w-125 self-center border-2 border-gray-900 p-6">

          <div className="flex items-center gap-4">
            <Label className="w-24 text-xl font-semibold text-white">
              E-mail
            </Label>

            <Input
                type="email"
                placeholder="email_exemplo@gmail.com"
                className="border-gray-900 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <Label className="w-24 text-xl font-semibold text-white">
              Senha
            </Label>

            <Input
                type="password"
                placeholder="Insira uma senha..."
                className="border-gray-900 bg-white"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
                className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
                onClick={handleLogin}
            >
              Entrar
            </Button>
          </div>

          <div className="space-y-2 text-center">
            <Link to="/recoverpass">
            <span className="cursor-pointer text-white underline">
              Esqueceu a senha?
            </span>
            </Link>

            <p className="text-white">
              Não tem conta?{" "}
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
