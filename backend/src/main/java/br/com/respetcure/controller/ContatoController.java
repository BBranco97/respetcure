package br.com.respetcure.controller;

import br.com.respetcure.model.Contato;
import br.com.respetcure.service.ContatoService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contatos")
public class ContatoController {

    private final ContatoService service;

    public ContatoController(
            ContatoService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Contato> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Contato buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }

    @PostMapping
    public Contato salvar(
            @RequestBody Contato contato
    ) {

        return service.salvar(
                contato
        );
    }

    @PutMapping("/{id}")
    public Contato atualizar(
            @PathVariable Integer id,
            @RequestBody Contato contato
    ) {

        return service.atualizar(
                id,
                contato
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
