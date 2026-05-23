package br.com.respetcure.service;

import br.com.respetcure.model.Contato;
import br.com.respetcure.repository.ContatoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ContatoService {

    private final ContatoRepository repository;

    public ContatoService(
            ContatoRepository repository
    ) {
        this.repository = repository;
    }

    public List<Contato> listarTodos() {

        return repository.findAll();
    }

    public Contato buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Contato nao encontrado."
                        )
                );
    }

    public Contato salvar(
            Contato contato
    ) {

        if (repository.existsByEmail(
                contato.getEmail()
        )) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "E-mail ja cadastrado."
            );
        }

        return repository.save(
                contato
        );
    }

    public Contato atualizar(
            Integer id,
            Contato dados
    ) {

        Contato contato =
                buscarPorId(
                        id
                );

        contato.setNome(
                dados.getNome()
        );
        contato.setCidade(
                dados.getCidade()
        );
        contato.setUf(
                dados.getUf()
        );
        contato.setNumeroCelular(
                dados.getNumeroCelular()
        );
        contato.setEmail(
                dados.getEmail()
        );

        return repository.save(
                contato
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
}
