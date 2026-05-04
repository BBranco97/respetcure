package br.com.respetcure.repository.dominio;

import br.com.respetcure.model.dominio.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository
        extends JpaRepository<Status, Integer> {
}