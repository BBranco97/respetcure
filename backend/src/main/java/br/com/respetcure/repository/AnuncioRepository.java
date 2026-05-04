package br.com.respetcure.repository;

import br.com.respetcure.model.Anuncio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnuncioRepository
        extends JpaRepository<Anuncio, Integer> {
}