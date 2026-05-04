package br.com.respetcure.repository.dominio;

import br.com.respetcure.model.dominio.Especie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EspecieRepository
        extends JpaRepository<Especie, Integer> {
}