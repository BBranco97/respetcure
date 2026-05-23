package br.com.respetcure.service.dominio;

import br.com.respetcure.model.dominio.Uf;
import br.com.respetcure.repository.dominio.UfRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UfService {

    private final UfRepository repository;

    public UfService(
            UfRepository repository
    ) {
        this.repository = repository;
    }

    public List<Uf> listarTodos() {

        return repository.findAll();
    }

    public Uf buscarPorSigla(
            String sigla
    ) {

        return repository.findById(
                        sigla
                )
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "UF nao encontrada."
                        )
                );
    }
}
