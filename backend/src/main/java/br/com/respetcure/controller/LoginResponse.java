package br.com.respetcure.controller;

import br.com.respetcure.model.Usuario;

public record LoginResponse(
        Integer id,
        String nome,
        String email,
        String ufUsuario,
        String fotoUrl,
        String status
) {

    public static LoginResponse from(
            Usuario usuario
    ) {

        String email =
                usuario.getContato() == null
                        ? null
                        : usuario.getContato()
                                .getEmail();

        String status =
                usuario.getStatus() == null
                        ? null
                        : usuario.getStatus()
                                .getDescricao();

        return new LoginResponse(
                usuario.getId(),
                usuario.getNome(),
                email,
                usuario.getUfUsuario(),
                usuario.getFotoUrl(),
                status
        );
    }
}
