package br.com.respetcure.service;

import br.com.respetcure.model.Anuncio;
import br.com.respetcure.repository.AnuncioRepository;
import org.springframework.stereotype.Service;

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
}