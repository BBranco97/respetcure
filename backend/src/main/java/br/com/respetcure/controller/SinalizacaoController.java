package br.com.respetcure.controller;

import br.com.respetcure.model.Sinalizacao;
import br.com.respetcure.service.SinalizacaoService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sinalizacoes")
public class SinalizacaoController {

    private final SinalizacaoService service;

    public SinalizacaoController(
            SinalizacaoService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Sinalizacao> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Sinalizacao buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }

    @PostMapping
    public Sinalizacao salvar(
            @RequestBody Sinalizacao sinalizacao
    ) {

        return service.salvar(
                sinalizacao
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
