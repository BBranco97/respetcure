import { api } from "./api";

export async function solicitarRecuperacaoSenha(

    email: string

) {

    return api.post(

        "/usuarios/recuperar-senha",

        {
            email
        }
    );
}

export async function redefinirSenha(

    token: string,

    novaSenha: string

) {

    await api.post(

        "/usuarios/redefinir-senha",

        {

            token,

            novaSenha
        }
    )
}