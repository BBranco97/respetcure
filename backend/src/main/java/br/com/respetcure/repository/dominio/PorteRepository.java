package br.com.respetcure.repository.dominio;

import br.com.respetcure.model.dominio.Porte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PorteRepository
        extends JpaRepository<Porte, Integer> {
}