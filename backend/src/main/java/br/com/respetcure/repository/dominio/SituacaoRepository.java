package br.com.respetcure.repository.dominio;

import br.com.respetcure.model.dominio.Situacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SituacaoRepository
        extends JpaRepository<Situacao, Integer> {
}