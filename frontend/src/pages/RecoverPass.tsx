import { Card } from "@/components/ui/card"
import background from "../assets/Pages.svg"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import { useState } from "react"

import { solicitarRecuperacaoSenha }
  from "@/lib/usuario-service"

export function RecoverPass() {

  const [email, setEmail] =
      useState("")

  const [carregando, setCarregando] =
      useState(false)

  async function enviarRecuperacao() {

    if (carregando) {

      return
    }

    try {

      setCarregando(true)

      await solicitarRecuperacaoSenha(
          email
      )

      alert(
          "E-mail enviado com sucesso."
      )

    } catch {

      alert(
          "Erro ao enviar e-mail."
      )

    } finally {

      setCarregando(false)
    }
  }

  return (

      <div
          className="flex h-screen w-screen flex-col content-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
                `url('${background}')`
          }}
      >

        <h1 className="title mb-2 self-center">
          Recuperar Senha
        </h1>

        <Card className="w-125 self-center border-2 border-gray-900 p-6">

          <div className="flex flex-col items-center gap-4">

            <Label className="text-center text-xl font-semibold text-white">

              Informe um email cadastrado
              para recuperar a senha

            </Label>

            <Input

                type="email"

                placeholder="email_exemplo@gmail.com"

                className="border-gray-900 bg-gray-200"

                value={email}

                onChange={(e) =>

                    setEmail(
                        e.target.value
                    )
                }
            />

          </div>

          <div className="flex justify-evenly pt-4">

            <Link to="/login">

              <Button className="border-2 border-gray-900 px-10 py-2 text-lg hover:bg-orange-400">

                Voltar

              </Button>

            </Link>

            <Button

                type="button"

                disabled={carregando}

                onClick={
                  enviarRecuperacao
                }

                className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600"
            >

              {

                carregando

                    ? "Enviando..."

                    : "Enviar"
              }

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

      </div>
  )
}