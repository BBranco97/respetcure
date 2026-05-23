package br.com.respetcure.service;

import br.com.respetcure.model.Anuncio;
import br.com.respetcure.repository.AnuncioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AnuncioService {

    private final AnuncioRepository anuncioRepository;

    public AnuncioService(
            AnuncioRepository anuncioRepository
    ) {
        this.anuncioRepository = anuncioRepository;
    }

    public Anuncio salvar(
            Anuncio anuncio
    ) {

        return anuncioRepository.save(
                anuncio
        );
    }

    public List<Anuncio> listarTodos() {

        return anuncioRepository.findAll();
    }

    public Anuncio buscarPorId(
            Integer id
    ) {

        return anuncioRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Anuncio nao encontrado."
                        )
                );
    }

    public Anuncio atualizar(
            Integer id,
            Anuncio anuncio
    ) {

        anuncio.setId(
                id
        );

        return anuncioRepository.save(
                anuncio
        );
    }

    public void excluir(
            Integer id
    ) {

        anuncioRepository.delete(
                buscarPorId(
                        id
                )
        );
    }
}
