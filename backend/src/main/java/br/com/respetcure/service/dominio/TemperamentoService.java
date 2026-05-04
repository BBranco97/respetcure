package br.com.respetcure.service.dominio;

import br.com.respetcure.model.dominio.Temperamento;
import br.com.respetcure.repository.dominio.TemperamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemperamentoService {

    private final TemperamentoRepository repository;

    public TemperamentoService(
            TemperamentoRepository repository
    ) {
        this.repository = repository;
    }

    public List<Temperamento> listarTodos() {

        return repository.findAll();
    }

    public Temperamento buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Temperamento não encontrado."
                        )
                );
    }
}