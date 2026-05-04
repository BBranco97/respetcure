package br.com.respetcure.service.dominio;

import br.com.respetcure.model.dominio.Tipo;
import br.com.respetcure.repository.dominio.TipoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoService {

    private final TipoRepository repository;

    public TipoService(
            TipoRepository repository
    ) {
        this.repository = repository;
    }

    public List<Tipo> listarTodos() {

        return repository.findAll();
    }

    public Tipo buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Tipo não encontrado."
                        )
                );
    }
}