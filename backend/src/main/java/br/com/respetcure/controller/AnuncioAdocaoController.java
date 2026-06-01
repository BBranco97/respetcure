package br.com.respetcure.controller;

import br.com.respetcure.model.AnuncioAdocao;
import br.com.respetcure.service.AnuncioAdocaoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/adocoes")
public class AnuncioAdocaoController {

    private final AnuncioAdocaoService service;

    public AnuncioAdocaoController(
            AnuncioAdocaoService service
    ) {
        this.service = service;
    }

    @GetMapping
    public Page<AnuncioAdocao>
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
    public AnuncioAdocao
    buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<AnuncioAdocao>
    listarPorUsuario(
            @PathVariable Integer usuarioId
    ) {

        return service.listarPorUsuario(
                usuarioId
        );
    }

    @PostMapping
    public AnuncioAdocao salvar(
            @RequestBody AnuncioAdocao anuncio
    ) {

        return service.salvar(
                anuncio
        );
    }

    @PutMapping("/{id}")
    public AnuncioAdocao atualizar(
            @PathVariable Integer id,
            @RequestBody AnuncioAdocao anuncio
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
