package br.com.respetcure.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PostLoad;
import jakarta.persistence.PostPersist;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;
import org.springframework.data.domain.Persistable;

@Entity
@Table(name = "administrador")
@Data
public class Administrador implements Persistable<Integer> {

    @Id
    private Integer usuarioId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Transient
    @JsonIgnore
    private boolean novo = true;

    @Override
    @JsonIgnore
    public Integer getId() {

        return usuarioId;
    }

    @Override
    @JsonIgnore
    public boolean isNew() {

        return novo;
    }

    @PostLoad
    @PostPersist
    void marcarComoExistente() {

        this.novo = false;
    }
}
