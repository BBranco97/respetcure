package br.com.respetcure.repository.dominio;

import br.com.respetcure.model.dominio.Temperamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemperamentoRepository
        extends JpaRepository<Temperamento, Integer> {
}