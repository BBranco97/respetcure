package br.com.respetcure.repository.dominio;

import br.com.respetcure.model.dominio.Uf;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UfRepository
        extends JpaRepository<Uf, String> {
}
