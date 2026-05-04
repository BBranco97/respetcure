package br.com.respetcure.controller.dominio;

import br.com.respetcure.model.dominio.Porte;
import br.com.respetcure.service.dominio.PorteService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PorteController {

    private final PorteService service;

    public PorteController(
            PorteService service
    ) {
        this.service = service;
    }

    @GetMapping("/dominios/portes")
    public List<Porte> listarTodos() {

        return service.listarTodos();
    }
}