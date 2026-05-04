package br.com.respetcure.service.dominio;

import br.com.respetcure.model.dominio.Especie;
import br.com.respetcure.repository.dominio.EspecieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecieService {

    private final EspecieRepository repository;

    public EspecieService(
            EspecieRepository repository
    ) {
        this.repository = repository;
    }

    public List<Especie> listarTodos() {

        return repository.findAll();
    }

    public Especie buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Espécie não encontrada."
                        )
                );
    }
}