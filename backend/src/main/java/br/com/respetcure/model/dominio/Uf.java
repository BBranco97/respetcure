package br.com.respetcure.model.dominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "dominio_uf")
@Data
public class Uf {

    @Id
    @Column(length = 2)
    private String sigla;

    @Column(nullable = false, length = 30)
    private String descricao;
}
