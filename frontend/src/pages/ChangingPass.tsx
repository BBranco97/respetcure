import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import BackgroundLayout from "@/layouts/BackgroundLayout"
import { useState } from "react"
import { redefinirSenha } from "@/lib/usuario-service"

export function ChangingPass() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit() {
    setMessage("")
    setError("")

    if (!token) {
      setError("Token de redefinicao nao informado.")
      return
    }

    if (!password || !confirmPassword) {
      setError("Preencha e confirme a nova senha.")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem.")
      return
    }

    try {
      setIsSaving(true)
      await redefinirSenha(token, password)
      setMessage("Senha redefinida com sucesso.")
      setTimeout(() => navigate("/login"), 1200)
    } catch {
      setError("Token invalido ou expirado.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <BackgroundLayout>
      <h1 className="title mb-2 self-center">Redefinir Senha</h1>
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
        <div className="flex items-center gap-4">
          <Label className="w-24 text-xl font-semibold text-white">
            Nova Senha
          </Label>
          <Input
            type="password"
            placeholder="Nova senha"
            className="border-gray-900 bg-white"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="w-32 text-xl font-semibold text-white">
            Confirme sua Senha
          </Label>
          <Input
            type="password"
            placeholder="Confirme a nova senha"
            className="border-gray-900 bg-white"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
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
            disabled={isSaving}
            onClick={handleSubmit}
          >
            {isSaving ? "Salvando..." : "Enviar"}
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
