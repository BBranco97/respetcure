package br.com.respetcure.repository;

import br.com.respetcure.model.Sinalizacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SinalizacaoRepository
        extends JpaRepository<Sinalizacao, Integer> {
}
