package br.com.respetcure.service;

import br.com.respetcure.model.AnuncioAchadosPerdidos;
import br.com.respetcure.repository.AnuncioAchadosPerdidosRepository;
import br.com.respetcure.util.GeoUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnuncioAchadosPerdidosService {

    private final AnuncioAchadosPerdidosRepository repository;

    public AnuncioAchadosPerdidosService(
            AnuncioAchadosPerdidosRepository repository
    ) {
        this.repository = repository;
    }

    public AnuncioAchadosPerdidos salvar(
            AnuncioAchadosPerdidos anuncio,
            Double longitude,
            Double latitude
    ) {

        anuncio.setLocalizacao(
                GeoUtils.criarPonto(
                        longitude,
                        latitude
                )
        );

        return repository.save(
                anuncio
        );
    }

    public List<AnuncioAchadosPerdidos>
    listarTodos() {

        return repository.findAll();
    }

    public AnuncioAchadosPerdidos
    buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Anúncio não encontrado."
                        )
                );
    }
}