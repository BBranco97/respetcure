package br.com.respetcure.controller.dominio;

import br.com.respetcure.model.dominio.Uf;
import br.com.respetcure.service.dominio.UfService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UfController {

    private final UfService service;

    public UfController(
            UfService service
    ) {
        this.service = service;
    }

    @GetMapping("/dominios/ufs")
    public List<Uf> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/dominios/ufs/{sigla}")
    public Uf buscarPorSigla(
            @PathVariable String sigla
    ) {

        return service.buscarPorSigla(
                sigla
        );
    }
}
