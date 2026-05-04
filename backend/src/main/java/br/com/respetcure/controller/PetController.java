package br.com.respetcure.controller;

import br.com.respetcure.model.Pet;
import br.com.respetcure.service.PetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {

    private final PetService service;

    public PetController(
            PetService service
    ) {
        this.service = service;
    }

    @GetMapping
    public List<Pet> listarTodos() {

        return service.listarTodos();
    }

    @GetMapping("/buscar")
    public List<Pet> buscarPorNome(
            @RequestParam String nome
    ) {

        return service.buscarPorNome(
                nome
        );
    }

    @PostMapping
    public Pet salvar(
            @RequestBody Pet pet
    ) {

        return service.salvar(
                pet
        );
    }
}