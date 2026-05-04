package br.com.respetcure.controller;

import br.com.respetcure.model.Usuario;
import br.com.respetcure.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(
        origins = "http://localhost:5173"
)
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(
            UsuarioService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Usuario> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
    }

    @PostMapping
    public Usuario salvar(
            @RequestBody Usuario usuario
    ) {

        return service.salvar(
                usuario
        );
    }

    @PutMapping("/{id}")
    public Usuario atualizar(
            @PathVariable Integer id,
            @RequestBody Usuario usuario
    ) {

        return service.atualizar(
                id,
                usuario
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

    @PostMapping("/recuperar-senha")
    public ResponseEntity<Void> solicitarRecuperacaoSenha(
            @RequestBody EmailRequest request
    ) {

        service.solicitarRecuperacaoSenha(
                request.email()
        );

        return ResponseEntity.ok().build();
    }

    @PostMapping("/redefinir-senha")
    public ResponseEntity<Void> redefinirSenha(
            @RequestBody RedefinirSenhaRequest request
    ) {

        service.redefinirSenha(
                request.token(),
                request.novaSenha()
        );

        return ResponseEntity.ok().build();
    }
}