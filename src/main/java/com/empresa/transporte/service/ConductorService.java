package com.empresa.transporte.service;

import com.empresa.transporte.model.Conductor;
import com.empresa.transporte.repository.ConductorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConductorService {
    private final ConductorRepository conductorRepository;

    public ConductorService(ConductorRepository conductorRepository) {
        this.conductorRepository = conductorRepository;
    }

    public Conductor crearConductor(Conductor conductor) {
        return conductorRepository.save(conductor);
    }

    public List<Conductor> listarConductores() {
        return conductorRepository.findAll();
    }

    public void deshabilitarConductor(Long id) {
        Conductor conductor = conductorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conductor no encontrado"));
        conductor.setActivo(false);
        conductorRepository.save(conductor);
    }
}
