package br.com.respetcure.model;

import br.com.respetcure.model.dominio.Especie;
import br.com.respetcure.model.dominio.Porte;
import br.com.respetcure.model.dominio.Sexo;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pet")
@Data
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "especie_id")
    private Especie especie;

    @ManyToOne
    @JoinColumn(name = "porte_id")
    private Porte porte;

    @ManyToOne
    @JoinColumn(name = "sexo_id")
    private Sexo sexo;

    @Column(length = 60)
    private String raca;

    @Column(length = 40)
    private String cor;

    private Integer idade;

    @Column(name = "foto_url", length = 500)
    private String fotoUrl;
}
