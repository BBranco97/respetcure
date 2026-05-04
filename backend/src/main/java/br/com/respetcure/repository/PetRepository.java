package br.com.respetcure.repository;

import br.com.respetcure.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository
        extends JpaRepository<Pet, Integer> {

    List<Pet> findByNomeContainingIgnoreCase(
            String nome
    );

}