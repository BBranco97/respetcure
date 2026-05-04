package br.com.respetcure.service.dominio;

import br.com.respetcure.model.dominio.Sexo;
import br.com.respetcure.repository.dominio.SexoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SexoService {

    private final SexoRepository repository;

    public SexoService(
            SexoRepository repository
    ) {
        this.repository = repository;
    }

    public List<Sexo> listarTodos() {

        return repository.findAll();
    }

    public Sexo buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Sexo não encontrado."
                        )
                );
    }
}