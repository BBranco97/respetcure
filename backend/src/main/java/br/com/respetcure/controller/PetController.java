package br.com.respetcure.controller;

import br.com.respetcure.model.Pet;
import br.com.respetcure.service.PetService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/{id}")
    public Pet buscarPorId(
            @PathVariable Integer id
    ) {

        return service.buscarPorId(
                id
        );
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

    @PostMapping("/{id}/foto")
    public Pet atualizarFoto(
            @PathVariable Integer id,
            @RequestParam("foto") MultipartFile foto
    ) {

        return service.atualizarFoto(
                id,
                foto
        );
    }

    @PutMapping("/{id}")
    public Pet atualizar(
            @PathVariable Integer id,
            @RequestBody Pet pet
    ) {

        return service.atualizar(
                id,
                pet
        );
    }

    @DeleteMapping("/{id}")
    public void excluir(
            @PathVariable Integer id
    ) {

        service.excluir(
                id
        );
    }
}
