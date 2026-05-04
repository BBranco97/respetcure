package br.com.respetcure.service;

import br.com.respetcure.model.Pet;
import br.com.respetcure.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(
            PetRepository petRepository
    ) {
        this.petRepository = petRepository;
    }

    public Pet salvar(
            Pet pet
    ) {

        return petRepository.save(
                pet
        );
    }

    public List<Pet> listarTodos() {

        return petRepository.findAll();
    }

    public List<Pet> buscarPorNome(
            String nome
    ) {

        return petRepository
                .findByNomeContainingIgnoreCase(
                        nome
                );
    }
}