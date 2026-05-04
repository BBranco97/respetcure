import { Card } from "@/components/ui/card"
import background from "../assets/Pages.svg"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useSearchParams } from "react-router-dom"
import { useState } from "react"

import { redefinirSenha }
    from "@/lib/usuario-service"

export function ResetPass() {

    const [searchParams] =
        useSearchParams()

    const token =
        searchParams.get("token")

    const [senha, setSenha] =
        useState("")

    const [confirmacao, setConfirmacao] =
        useState("")

    const [carregando, setCarregando] =
        useState(false)

    async function enviar() {

        if (senha !== confirmacao) {

            alert(
                "As senhas não coincidem."
            )

            return
        }

        try {

            setCarregando(true)

            await redefinirSenha(
                token!,
                senha
            )

            alert(
                "Senha redefinida com sucesso."
            )

        } catch {

            alert(
                "Token inválido ou expirado."
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
                Nova Senha
            </h1>

            <Card className="w-125 self-center border-2 border-gray-900 p-6">

                <div className="flex flex-col gap-4">

                    <Label className="text-white">
                        Nova senha
                    </Label>

                    <Input

                        type="password"

                        value={senha}

                        onChange={(e) =>

                            setSenha(
                                e.target.value
                            )
                        }
                    />

                    <Label className="text-white">
                        Confirmar senha
                    </Label>

                    <Input

                        type="password"

                        value={confirmacao}

                        onChange={(e) =>

                            setConfirmacao(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="flex justify-evenly pt-4">

                    <Link to="/login">

                        <Button>

                            Voltar

                        </Button>

                    </Link>

                    <Button

                        type="button"

                        disabled={carregando}

                        onClick={enviar}
                    >

                        {

                            carregando

                                ? "Salvando..."

                                : "Salvar"
                        }

                    </Button>

                </div>

            </Card>

        </div>
    )
}