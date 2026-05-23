package br.com.respetcure.service;

import br.com.respetcure.model.Sinalizacao;
import br.com.respetcure.repository.SinalizacaoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SinalizacaoService {

    private final SinalizacaoRepository repository;

    public SinalizacaoService(
            SinalizacaoRepository repository
    ) {
        this.repository = repository;
    }

    public List<Sinalizacao> listarTodos() {

        return repository.findAll();
    }

    public Sinalizacao buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Sinalizacao nao encontrada."
                        )
                );
    }

    public Sinalizacao salvar(
            Sinalizacao sinalizacao
    ) {

        if (sinalizacao.getAnuncio() == null &&
                sinalizacao.getUsuario() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Informe um anuncio ou usuario para sinalizar."
            );
        }

        return repository.save(
                sinalizacao
        );
    }

    public void excluir(
            Integer id
    ) {

        repository.delete(
                buscarPorId(
                        id
                )
        );
    }
}
