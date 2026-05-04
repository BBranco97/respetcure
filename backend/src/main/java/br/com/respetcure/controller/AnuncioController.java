package br.com.respetcure.controller;

import br.com.respetcure.model.Anuncio;
import br.com.respetcure.service.AnuncioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/anuncios")
public class AnuncioController {

    private final AnuncioService service;

    public AnuncioController(
            AnuncioService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Anuncio> listarTodos() {

        return service.listarTodos();
    }

    @PostMapping
    public Anuncio salvar(
            @RequestBody Anuncio anuncio
    ) {

        return service.salvar(
                anuncio
        );
    }
}