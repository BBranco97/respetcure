package br.com.respetcure.repository;

import br.com.respetcure.model.AnuncioAchadosPerdidos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnuncioAchadosPerdidosRepository
        extends JpaRepository<
        AnuncioAchadosPerdidos,
        Integer
        > {

    List<AnuncioAchadosPerdidos> findByUsuarioId(
            Integer usuarioId
    );
}
