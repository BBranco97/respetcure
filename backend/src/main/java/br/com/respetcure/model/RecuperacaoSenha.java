package br.com.respetcure.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "recuperacao_senha")
@Data
public class RecuperacaoSenha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(
            nullable = false,
            unique = true
    )
    private String token;

    @OneToOne
    @JoinColumn(
            name = "usuario_id",
            nullable = false
    )
    private Usuario usuario;

    @Column(
            nullable = false
    )
    private LocalDateTime expiracao;

    public void gerarToken() {

        this.token =
                UUID.randomUUID()
                        .toString();

        this.expiracao =
                LocalDateTime.now()
                        .plusMinutes(15);
    }
}