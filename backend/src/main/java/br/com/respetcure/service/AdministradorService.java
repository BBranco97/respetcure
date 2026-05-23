package br.com.respetcure.service;

import br.com.respetcure.model.Administrador;
import br.com.respetcure.model.Usuario;
import br.com.respetcure.repository.AdministradorRepository;
import br.com.respetcure.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AdministradorService {

    private final AdministradorRepository repository;

    private final UsuarioRepository usuarioRepository;

    public AdministradorService(
            AdministradorRepository repository,
            UsuarioRepository usuarioRepository
    ) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Administrador> listarTodos() {

        return repository.findAll();
    }

    public Administrador buscarPorUsuarioId(
            Integer usuarioId
    ) {

        return repository.findById(usuarioId)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Administrador nao encontrado."
                        )
                );
    }

    @Transactional
    public Administrador salvar(
            Administrador administrador
    ) {

        if (administrador.getUsuario() == null ||
                administrador.getUsuario().getId() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Usuario e obrigatorio."
            );
        }

        Usuario usuario =
                usuarioRepository.findById(
                                administrador.getUsuario()
                                        .getId()
                        )
                        .orElseThrow(
                                () -> new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Usuario nao encontrado."
                                )
                        );

        administrador.setUsuario(
                usuario
        );
        administrador.setUsuarioId(
                usuario.getId()
        );

        return repository.save(
                administrador
        );
    }

    public void excluir(
            Integer usuarioId
    ) {

        repository.delete(
                buscarPorUsuarioId(
                        usuarioId
                )
        );
    }
}
