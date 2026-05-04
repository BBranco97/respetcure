package br.com.respetcure.repository;

import br.com.respetcure.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository
        extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByNome(String nome);

    boolean existsByNome(String nome);

    Optional<Usuario> findByContatoEmail(
            String email
    );



}