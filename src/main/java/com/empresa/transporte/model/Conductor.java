package com.empresa.transporte.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Conductor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String cedula;
    private Integer edad;
    private String nacionalidad;
    private String sexo;
    private boolean activo = true;
}
