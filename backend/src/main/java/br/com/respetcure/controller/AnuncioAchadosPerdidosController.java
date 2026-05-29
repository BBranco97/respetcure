package br.com.respetcure.controller;

import br.com.respetcure.model.AnuncioAchadosPerdidos;
import br.com.respetcure.model.AnuncioAdocao;
import br.com.respetcure.service.AnuncioAchadosPerdidosService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public Page<AnuncioAchadosPerdidos>
    listarTodos(
            @PageableDefault(
                    size = 12,
                    sort = "id",
                    direction = Sort.Direction.DESC
            )
            Pageable pageable
    )
    {
        return service.listarTodos(
                pageable
        );
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

    @PutMapping("/{id}")
    public AnuncioAchadosPerdidos atualizar(
            @PathVariable Integer id,
            @RequestBody AnuncioAchadosPerdidos anuncio,
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false) Double latitude
    ) {

        return service.atualizar(
                id,
                anuncio,
                longitude,
                latitude
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
