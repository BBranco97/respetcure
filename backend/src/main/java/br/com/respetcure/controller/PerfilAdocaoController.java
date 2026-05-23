package br.com.respetcure.controller;

import br.com.respetcure.model.PerfilAdocao;
import br.com.respetcure.service.PerfilAdocaoService;
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
@RequestMapping("/perfis-adocao")
public class PerfilAdocaoController {

    private final PerfilAdocaoService service;

    public PerfilAdocaoController(
            PerfilAdocaoService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<PerfilAdocao> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public PerfilAdocao buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }

    @GetMapping("/usuario/{usuarioId}")
    public PerfilAdocao buscarPorUsuario(
            @PathVariable Integer usuarioId
    ) {

        return service.buscarPorUsuario(
                usuarioId
        );
    }

    @PostMapping
    public PerfilAdocao salvar(
            @RequestBody PerfilAdocao perfil
    ) {

        return service.salvar(
                perfil
        );
    }

    @PutMapping("/{id}")
    public PerfilAdocao atualizar(
            @PathVariable Integer id,
            @RequestBody PerfilAdocao perfil
    ) {

        return service.atualizar(
                id,
                perfil
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
