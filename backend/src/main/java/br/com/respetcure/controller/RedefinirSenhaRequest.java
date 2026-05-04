package br.com.respetcure.controller;

public record RedefinirSenhaRequest(

        String token,
        String novaSenha

) {
}