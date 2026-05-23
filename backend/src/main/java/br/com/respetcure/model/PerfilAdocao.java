package br.com.respetcure.model;

import br.com.respetcure.model.dominio.Especie;
import br.com.respetcure.model.dominio.Porte;
import br.com.respetcure.model.dominio.Sexo;
import br.com.respetcure.model.dominio.Temperamento;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "perfil_adocao")
@Data
public class PerfilAdocao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "especie_id")
    private Especie especie;

    @ManyToOne
    @JoinColumn(name = "porte_id")
    private Porte porte;

    @Column(name = "idade_min")
    private Integer idadeMin;

    @Column(name = "idade_max")
    private Integer idadeMax;

    @ManyToOne
    @JoinColumn(name = "temperamento_id")
    private Temperamento temperamento;

    @ManyToOne
    @JoinColumn(name = "sexo_id")
    private Sexo sexo;

    @Column(name = "possui_crianca")
    private Boolean possuiCrianca;

    @Column(name = "possui_pet")
    private Boolean possuiPet;
}
