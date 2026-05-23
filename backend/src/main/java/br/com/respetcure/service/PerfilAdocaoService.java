package br.com.respetcure.service;

import br.com.respetcure.model.PerfilAdocao;
import br.com.respetcure.repository.PerfilAdocaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PerfilAdocaoService {

    private final PerfilAdocaoRepository repository;

    public PerfilAdocaoService(
            PerfilAdocaoRepository repository
    ) {
        this.repository = repository;
    }

    public List<PerfilAdocao> listarTodos() {

        return repository.findAll();
    }

    public PerfilAdocao buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Perfil de adocao nao encontrado."
                        )
                );
    }

    public PerfilAdocao buscarPorUsuario(
            Integer usuarioId
    ) {

        return repository.findByUsuarioId(usuarioId)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Perfil de adocao nao encontrado."
                        )
                );
    }

    public PerfilAdocao salvar(
            PerfilAdocao perfil
    ) {

        validar(
                perfil
        );

        if (perfil.getUsuario() != null &&
                perfil.getUsuario().getId() != null &&
                repository.existsByUsuarioId(
                        perfil.getUsuario()
                                .getId()
                )) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Usuario ja possui perfil de adocao."
            );
        }

        return repository.save(
                perfil
        );
    }

    public PerfilAdocao atualizar(
            Integer id,
            PerfilAdocao dados
    ) {

        validar(
                dados
        );

        dados.setId(
                id
        );

        return repository.save(
                dados
        );
    }

    public void excluir(
            Integer id
    ) {

        repository.delete(
                buscarPorId(
                        id
                )
        );
    }

    private void validar(
            PerfilAdocao perfil
    ) {

        if (perfil.getUsuario() == null ||
                perfil.getEspecie() == null ||
                perfil.getPorte() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Usuario, especie e porte sao obrigatorios."
            );
        }

        if (perfil.getIdadeMin() != null &&
                perfil.getIdadeMin() < 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Idade minima deve ser maior ou igual a zero."
            );
        }

        if (perfil.getIdadeMax() != null &&
                perfil.getIdadeMax() < 0) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Idade maxima deve ser maior ou igual a zero."
            );
        }

        if (perfil.getIdadeMin() != null &&
                perfil.getIdadeMax() != null &&
                perfil.getIdadeMax() < perfil.getIdadeMin()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Idade maxima deve ser maior ou igual a idade minima."
            );
        }
    }
}
