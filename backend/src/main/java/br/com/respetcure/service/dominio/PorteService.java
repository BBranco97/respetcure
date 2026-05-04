package br.com.respetcure.service.dominio;

import br.com.respetcure.model.dominio.Porte;
import br.com.respetcure.repository.dominio.PorteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PorteService {

    private final PorteRepository repository;

    public PorteService(
            PorteRepository repository
    ) {
        this.repository = repository;
    }

    public List<Porte> listarTodos() {

        return repository.findAll();
    }
}