import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import BackgroundLayout from "@/layouts/BackgroundLayout"
import { useState } from "react"
import { solicitarRecuperacaoSenha } from "@/lib/usuario-service"

export function RecoverPass() {
  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit() {
    setMessage("")
    setError("")

    if (!email.trim()) {
      setError("Informe um email cadastrado.")
      return
    }

    try {
      setIsSending(true)
      await solicitarRecuperacaoSenha(email.trim())
      setMessage("Enviamos as instrucoes de recuperacao para seu email.")
    } catch {
      setError("Nao foi possivel solicitar a recuperacao de senha.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <BackgroundLayout>
      <h1 className="title mb-2 self-center">Recuperar Senha</h1>
      <Card className="w-125 self-center border-2 border-gray-900 p-6">
        {error && (
          <div className="rounded-md border border-red-800 bg-red-100 p-3 text-red-800">
            {error}
          </div>
        )}
        {message && (
          <div className="rounded-md border border-green-800 bg-green-100 p-3 text-green-800">
            {message}
          </div>
        )}
        <div className="flex flex-col items-center gap-4">
          <Label className="text-center text-xl font-semibold text-white">
            Informe um email cadastrado para recuperar a senha
          </Label>
          <Input
            type="email"
            placeholder="email_exemplo@gmail.com"
            className="border-gray-900 bg-white"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="flex justify-evenly pt-4">
          <Link to="/login">
            <Button className="border-2 border-gray-900 px-10 py-2 text-lg hover:bg-orange-400">
              Voltar
            </Button>
          </Link>
          <Button
            className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
            disabled={isSending}
            onClick={handleSubmit}
          >
            {isSending ? "Enviando..." : "Enviar"}
          </Button>
        </div>

        <div className="space-y-2 text-center">
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
