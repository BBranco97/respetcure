package br.com.respetcure.service;

import br.com.respetcure.model.AnuncioAdocao;
import br.com.respetcure.repository.AnuncioAdocaoRepository;
import org.springframework.stereotype.Service;

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

    public List<AnuncioAdocao>
    listarTodos() {

        return repository.findAll();
    }

    public AnuncioAdocao
    buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Anúncio não encontrado."
                        )
                );
    }

    public void excluir(
            Integer id
    ) {

        repository.deleteById(
                id
        );
    }
}