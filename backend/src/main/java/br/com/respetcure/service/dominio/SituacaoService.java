package br.com.respetcure.service.dominio;

import br.com.respetcure.model.dominio.Situacao;
import br.com.respetcure.repository.dominio.SituacaoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SituacaoService {

    private final SituacaoRepository repository;

    public SituacaoService(
            SituacaoRepository repository
    ) {
        this.repository = repository;
    }

    public List<Situacao> listarTodos() {

        return repository.findAll();
    }

    public Situacao buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Situação não encontrada."
                        )
                );
    }
}