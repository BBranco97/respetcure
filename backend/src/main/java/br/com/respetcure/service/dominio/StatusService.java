package br.com.respetcure.service.dominio;

import br.com.respetcure.model.dominio.Status;
import br.com.respetcure.repository.dominio.StatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService {

    private final StatusRepository repository;

    public StatusService(
            StatusRepository repository
    ) {
        this.repository = repository;
    }

    public List<Status> listarTodos() {

        return repository.findAll();
    }

    public Status buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Status não encontrado."
                        )
                );
    }
}