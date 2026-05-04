package br.com.respetcure.model;

import br.com.respetcure.model.dominio.Temperamento;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Entity
@Table(name = "anuncio_adocao")
@Data
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "id")
public class AnuncioAdocao extends Anuncio {

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "contato_id")
    private Contato contato;

    @ManyToOne
    @JoinColumn(name = "temperamento_id")
    private Temperamento temperamento;

    @Column(name = "convive_criancas")
    private Boolean conviveCriancas;

    @Column(name = "convive_pets")
    private Boolean convivePets;

    private Boolean desmamado;

    private Boolean vacinado;

    private Boolean vermifugado;

    private Boolean castrado;

    @Column(length = 255)
    private String vacinas;

    @Column(name = "data_vacina")
    private LocalDate dataVacina;

    @Column(length = 255)
    private String descricao;
}