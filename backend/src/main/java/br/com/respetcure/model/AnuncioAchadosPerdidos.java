package br.com.respetcure.model;

import br.com.respetcure.model.dominio.Tipo;
import br.com.respetcure.model.dominio.Situacao;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "anuncio_achados_perdidos")
@Data
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "id")
public class AnuncioAchadosPerdidos extends Anuncio {

    @ManyToOne
    @JoinColumn(name = "situacao_id")
    private Situacao situacao;

    @ManyToOne
    @JoinColumn(name = "tipo_id")
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "contato_id")
    private Contato contato;

    @Column(
            name = "localizacao",
            nullable = false,
            columnDefinition = "geography"
    )
    @JsonIgnore
    private Point localizacao;
}
