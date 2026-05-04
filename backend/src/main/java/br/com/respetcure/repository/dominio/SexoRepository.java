package br.com.respetcure.repository.dominio;

import br.com.respetcure.model.dominio.Sexo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SexoRepository
        extends JpaRepository<Sexo, Integer> {
}