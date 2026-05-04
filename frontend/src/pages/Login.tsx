import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Link } from "react-router-dom"
import  background  from "../assets/Pages.svg"

export function Login() {
  return (
    <div
      className="flex h-screen w-screen flex-col content-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <h1 className="title mb-2 self-center">Login</h1>
      <Card className="w-125 self-center border-2 border-gray-900 p-6">
        {/* Email */}
        <div className="flex items-center gap-4">
          <Label className="w-24 text-xl font-semibold text-white">
            E-mail
          </Label>
          <Input
            type="email"
            placeholder="email_exemplo@gmail.com"
            className="border-gray-900 bg-gray-200"
          />
        </div>

        {/* Senha */}
        <div className="flex items-center gap-4">
          <Label className="w-24 text-xl font-semibold text-white">Senha</Label>
          <Input
            type="password"
            placeholder="Insira uma senha..."
            className="border-gray-900 bg-gray-200"
          />
        </div>

        {/* Botão */}
        <div className="flex justify-center pt-4">
          <Button className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600">
            Entrar
          </Button>
        </div>

        {/* Links */}
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
    </div>
  )
}
