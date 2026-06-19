package br.com.respetcure.service;

import br.com.respetcure.model.AnuncioAchadosPerdidos;
import br.com.respetcure.repository.AnuncioAchadosPerdidosRepository;
import br.com.respetcure.util.GeoUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import br.com.respetcure.dto.AnuncioMapaDTO;

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

    public Page<AnuncioAchadosPerdidos> listarTodos(
            Pageable pageable
    ) {

        return repository.findAll(
                pageable
        );
    }

    public AnuncioAchadosPerdidos buscarPorId(
            Integer id
    ) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Anuncio nao encontrado."
                        )
                );
    }

    public List<AnuncioAchadosPerdidos> listarPorUsuario(
            Integer usuarioId
    ) {

        return repository.findByUsuarioId(
                usuarioId
        );
    }

    public AnuncioAchadosPerdidos atualizar(
            Integer id,
            AnuncioAchadosPerdidos anuncio,
            Double longitude,
            Double latitude
    ) {

        AnuncioAchadosPerdidos existente =
                buscarPorId(
                        id
                );

        anuncio.setId(
                id
        );

        if (longitude != null && latitude != null) {
            anuncio.setLocalizacao(
                    GeoUtils.criarPonto(
                            longitude,
                            latitude
                    )
            );
        } else {
            anuncio.setLocalizacao(
                    existente.getLocalizacao()
            );
        }

        return repository.save(
                anuncio
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

    public List<AnuncioMapaDTO> listarMapa() {

        return repository.findAll()
                .stream()
                .map(anuncio -> {

                    AnuncioMapaDTO dto =
                            new AnuncioMapaDTO();

                    dto.setId(
                            anuncio.getId()
                    );

                    dto.setNomePet(
                            anuncio.getPet()
                                    .getNome()
                    );

                    dto.setTipo(
                            anuncio.getTipo()
                                    .getDescricao()
                    );

                    dto.setLatitude(
                            anuncio.getLocalizacao()
                                    .getX()
                    );

                    dto.setLongitude(
                            anuncio.getLocalizacao()
                                    .getY()
                    );

                    return dto;
                })
                .toList();
    }
}
