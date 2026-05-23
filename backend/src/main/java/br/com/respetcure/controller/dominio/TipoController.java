package br.com.respetcure.controller.dominio;

import br.com.respetcure.model.dominio.Tipo;
import br.com.respetcure.service.dominio.TipoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TipoController {

    private final TipoService service;

    public TipoController(
            TipoService service
    ) {
        this.service = service;
    }

    @GetMapping("/dominios/tipos")
    public List<Tipo> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/dominios/tipos/{id}")
    public Tipo buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }
}
