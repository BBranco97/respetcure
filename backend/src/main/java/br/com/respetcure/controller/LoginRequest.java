package br.com.respetcure.controller;

public record LoginRequest(
        String email,
        String senha
) {
}
