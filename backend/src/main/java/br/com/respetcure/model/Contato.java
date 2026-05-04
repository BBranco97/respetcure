package br.com.respetcure.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "contato")
@Data
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(
            nullable = false,
            length = 100
    )
    private String nome;

    @Column(
            nullable = false,
            length = 100
    )
    private String cidade;

    @Column(
            nullable = false,
            length = 2
    )
    private String uf;

    @Column(
            name = "numero_celular",
            nullable = false,
            length = 20
    )
    private String numeroCelular;

    @Column(
            nullable = false,
            unique = true,
            length = 100
    )
    private String email;
}