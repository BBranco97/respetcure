package br.com.respetcure.repository;

import br.com.respetcure.model.AnuncioAdocao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnuncioAdocaoRepository
        extends JpaRepository<
        AnuncioAdocao,
        Integer
        > {
}