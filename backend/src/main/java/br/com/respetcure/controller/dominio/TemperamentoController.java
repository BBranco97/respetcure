package br.com.respetcure.controller.dominio;

import br.com.respetcure.model.dominio.Temperamento;
import br.com.respetcure.service.dominio.TemperamentoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TemperamentoController {

    private final TemperamentoService service;

    public TemperamentoController(
            TemperamentoService service
    ) {
        this.service = service;
    }

    @GetMapping("/dominios/temperamentos")
    public List<Temperamento> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/dominios/temperamentos/{id}")
    public Temperamento buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }
}
