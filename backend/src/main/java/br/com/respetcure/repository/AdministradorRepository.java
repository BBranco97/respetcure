package br.com.respetcure.repository;

import br.com.respetcure.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministradorRepository
        extends JpaRepository<Administrador, Integer> {
}
