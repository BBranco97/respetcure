package br.com.respetcure.repository.dominio;

import br.com.respetcure.model.dominio.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoRepository
        extends JpaRepository<Tipo, Integer> {
}