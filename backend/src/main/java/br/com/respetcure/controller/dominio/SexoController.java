package br.com.respetcure.controller.dominio;

import br.com.respetcure.model.dominio.Sexo;
import br.com.respetcure.service.dominio.SexoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SexoController {

    private final SexoService service;

    public SexoController(
            SexoService service
    ) {
        this.service = service;
    }

    @GetMapping("/dominios/sexos")
    public List<Sexo> listarTodos() {

        return service.listarTodos();
    }
}