package br.com.respetcure.controller;

import br.com.respetcure.model.AnuncioAchadosPerdidos;
import br.com.respetcure.service.AnuncioAchadosPerdidosService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/achados-perdidos")
public class AnuncioAchadosPerdidosController {

    private final AnuncioAchadosPerdidosService service;

    public AnuncioAchadosPerdidosController(
            AnuncioAchadosPerdidosService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<AnuncioAchadosPerdidos>
    listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public AnuncioAchadosPerdidos
    buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }

    @PostMapping
    public AnuncioAchadosPerdidos salvar(
            @RequestBody AnuncioAchadosPerdidos anuncio,
            @RequestParam Double longitude,
            @RequestParam Double latitude
    ) {

        return service.salvar(
                anuncio,
                longitude,
                latitude
        );
    }
}