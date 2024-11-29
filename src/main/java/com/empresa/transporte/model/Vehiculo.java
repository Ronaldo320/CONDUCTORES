package com.empresa.transporte.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placa;
    private String tipoVehiculo; // Puede ser "CARRO" o "CAMION".
    private boolean activo = true;

    @OneToOne
    private Conductor conductor;
}
