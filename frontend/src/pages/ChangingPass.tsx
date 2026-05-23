import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import BackgroundLayout from "@/layouts/BackgroundLayout"

export function ChangingPass() {
  return (
    <BackgroundLayout>
      <h1 className="title mb-2 self-center">Redefinir Senha</h1>
      <Card className="w-125 self-center border-2 border-gray-900 p-6">
        <div className="flex items-center gap-4">
          <Label className="w-24 text-xl font-semibold text-white">
            Nova Senha
          </Label>
          <Input
            type="password"
            placeholder="email_exemplo@gmail.com"
            className="border-gray-900 bg-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="w-32 text-xl font-semibold text-white">
            Confirme sua Senha
          </Label>
          <Input
            type="password"
            placeholder="email_exemplo@gmail.com"
            className="border-gray-900 bg-white"
          />
        </div>

        <div className="flex justify-evenly pt-4">
          <Link to="/login">
            <Button className="border-2 border-gray-900 px-10 py-2 text-lg hover:bg-orange-400">
              Voltar
            </Button>
          </Link>
          <Button className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600">
            Enviar
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
