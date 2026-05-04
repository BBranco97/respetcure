package br.com.respetcure.repository;

import br.com.respetcure.model.RecuperacaoSenha;
import br.com.respetcure.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface RecuperacaoSenhaRepository
        extends JpaRepository<
        RecuperacaoSenha,
        Integer> {

    Optional<RecuperacaoSenha> findByToken(
            String token
    );

    Optional<RecuperacaoSenha> findByUsuario(
            Usuario usuario
    );

    void deleteByExpiracaoBefore(
            LocalDateTime dataHora
    );
}