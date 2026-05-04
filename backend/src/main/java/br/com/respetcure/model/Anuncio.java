package br.com.respetcure.model;

import br.com.respetcure.model.dominio.Status;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "anuncio")
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Anuncio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;
}