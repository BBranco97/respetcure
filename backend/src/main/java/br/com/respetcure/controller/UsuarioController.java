package br.com.respetcure.controller;

import br.com.respetcure.model.Usuario;
import br.com.respetcure.service.UsuarioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(
        originPatterns = {
                "http://localhost:*",
                "http://127.0.0.1:*"
        }
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
    public Page<Usuario> listarTodos(
            Pageable pageable
    ) {

        return service.listarTodos(
                pageable
        );
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

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        Usuario usuario =
                service.autenticar(
                        request.email(),
                        request.senha()
                );

        return LoginResponse.from(
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

    @PostMapping("/{id}/foto")
    public Usuario atualizarFoto(
            @PathVariable Integer id,
            @RequestParam("file") MultipartFile file
    ) {

        return service.atualizarFoto(
                id,
                file
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
