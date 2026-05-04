package br.com.respetcure.repository;

import br.com.respetcure.model.AnuncioAchadosPerdidos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnuncioAchadosPerdidosRepository
        extends JpaRepository<
        AnuncioAchadosPerdidos,
        Integer
        > {
}