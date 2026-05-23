package br.com.respetcure.controller;

import br.com.respetcure.model.Administrador;
import br.com.respetcure.service.AdministradorService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/administradores")
public class AdministradorController {

    private final AdministradorService service;

    public AdministradorController(
            AdministradorService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Administrador> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/{usuarioId}")
    public Administrador buscarPorUsuarioId(
            @PathVariable Integer usuarioId
    ) {

        return service.buscarPorUsuarioId(
                usuarioId
        );
    }

    @PostMapping
    public Administrador salvar(
            @RequestBody Administrador administrador
    ) {

        return service.salvar(
                administrador
        );
    }

    @DeleteMapping("/{usuarioId}")
    public void excluir(
            @PathVariable Integer usuarioId
    ) {

        service.excluir(
                usuarioId
        );
    }
}
