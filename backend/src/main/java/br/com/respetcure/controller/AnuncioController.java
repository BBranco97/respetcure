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

    @GetMapping("/{id}")
    public Anuncio buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }

    @PostMapping
    public Anuncio salvar(
            @RequestBody Anuncio anuncio
    ) {

        return service.salvar(
                anuncio
        );
    }

    @PutMapping("/{id}")
    public Anuncio atualizar(
            @PathVariable Integer id,
            @RequestBody Anuncio anuncio
    ) {

        return service.atualizar(
                id,
                anuncio
        );
    }

    @DeleteMapping("/{id}")
    public void excluir(
            @PathVariable Integer id
    ) {

        service.excluir(
                id
        );
    }
}
