package br.com.respetcure.dto;

import lombok.Data;

@Data
public class AnuncioMapaDTO {

    private Integer id;
    private String nomePet;
    private String tipo;
    private Double latitude;
    private Double longitude;
}