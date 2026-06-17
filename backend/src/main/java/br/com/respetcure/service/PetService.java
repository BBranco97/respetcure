package br.com.respetcure.service;

import br.com.respetcure.model.Pet;
import br.com.respetcure.repository.PetRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final ImageStorageService imageStorageService;

    public PetService(
            PetRepository petRepository,
            ImageStorageService imageStorageService
    ) {
        this.petRepository = petRepository;
        this.imageStorageService = imageStorageService;
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

    public Pet buscarPorId(
            Integer id
    ) {

        return petRepository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Pet nao encontrado."
                        )
                );
    }

    public List<Pet> buscarPorNome(
            String nome
    ) {

        return petRepository
                .findByNomeContainingIgnoreCase(
                        nome
                );
    }

    public Pet atualizar(
            Integer id,
            Pet pet
    ) {

        pet.setId(
                id
        );

        return petRepository.save(
                pet
        );
    }

    public Pet atualizarFoto(
            Integer id,
            MultipartFile foto
    ) {

        Pet pet =
                buscarPorId(
                        id
                );

        pet.setFotoUrl(
                imageStorageService.savePetImage(
                        foto
                )
        );

        return petRepository.save(
                pet
        );
    }

    public void excluir(
            Integer id
    ) {

        petRepository.delete(
                buscarPorId(
                        id
                )
        );
    }
}
