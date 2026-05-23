package br.com.respetcure.controller.dominio;

import br.com.respetcure.model.dominio.Situacao;
import br.com.respetcure.service.dominio.SituacaoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SituacaoController {

    private final SituacaoService service;

    public SituacaoController(
            SituacaoService service
    ) {
        this.service = service;
    }

    @GetMapping("/dominios/situacoes")
    public List<Situacao> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/dominios/situacoes/{id}")
    public Situacao buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }
}
