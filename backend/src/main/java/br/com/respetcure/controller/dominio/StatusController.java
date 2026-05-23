package br.com.respetcure.controller.dominio;

import br.com.respetcure.model.dominio.Status;
import br.com.respetcure.service.dominio.StatusService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StatusController {

    private final StatusService service;

    public StatusController(
            StatusService service
    ) {
        this.service = service;
    }

    @GetMapping("/dominios/status")
    public List<Status> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/dominios/status/{id}")
    public Status buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }
}
