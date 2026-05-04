package br.com.respetcure.model;

import br.com.respetcure.model.dominio.Status;
import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    @OneToOne(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "contato_id")
    private Contato contato;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    @JsonProperty(
            access = JsonProperty.Access.WRITE_ONLY
    )
    @Column(
            name = "senha_hash",
            nullable = false,
            length = 255
    )
    private String senhaHash;

    @Column(name = "uf_usuario")
    private String ufUsuario;

    @Column(name = "foto_url", length = 500)
    private String fotoUrl;
}