package br.com.respetcure.repository;

import br.com.respetcure.model.PerfilAdocao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PerfilAdocaoRepository
        extends JpaRepository<PerfilAdocao, Integer> {

    Optional<PerfilAdocao> findByUsuarioId(Integer usuarioId);

    boolean existsByUsuarioId(Integer usuarioId);
}
