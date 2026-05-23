package br.com.respetcure.repository;

import br.com.respetcure.model.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository
        extends JpaRepository<Contato, Integer> {

    boolean existsByEmail(String email);
}
