package br.com.respetcure.service;

import br.com.respetcure.model.AnuncioAdocao;
import br.com.respetcure.repository.AnuncioAdocaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class AnuncioAdocaoService {

    private final AnuncioAdocaoRepository repository;

    public AnuncioAdocaoService(
            AnuncioAdocaoRepository repository
    ) {
        this.repository = repository;
    }

    public AnuncioAdocao salvar(
            AnuncioAdocao anuncio
    ) {

        return repository.save(
                anuncio
        );
    }

    public Page<AnuncioAdocao> listarTodos(
            Pageable pageable
    ) {

        return repository.findAll(
                pageable
        );
    }

    public AnuncioAdocao buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Anuncio nao encontrado."
                        )
                );
    }

    public List<AnuncioAdocao> listarPorUsuario(
            Integer usuarioId
    ) {

        return repository.findByUsuarioId(
                usuarioId
        );
    }

    public AnuncioAdocao atualizar(
            Integer id,
            AnuncioAdocao anuncio
    ) {

        anuncio.setId(
                id
        );

        return repository.save(
                anuncio
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
