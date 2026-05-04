package br.com.respetcure.controller.dominio;

import br.com.respetcure.model.dominio.Especie;
import br.com.respetcure.service.dominio.EspecieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EspecieController {

    private final EspecieService service;

    public EspecieController(
            EspecieService service
    ) {
        this.service = service;
    }

    @GetMapping("/dominios/especies")
    public List<Especie> listarTodos() {

        return service.listarTodos();
    }
}