package com.empresa.transporte.controller;

import com.empresa.transporte.model.Conductor;
import com.empresa.transporte.service.ConductorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conductores")
public class ConductorController {
    private final ConductorService conductorService;

    public ConductorController(ConductorService conductorService) {
        this.conductorService = conductorService;
    }

    @PostMapping
    public Conductor crearConductor(@RequestBody Conductor conductor) {
        return conductorService.crearConductor(conductor);
    }

    @GetMapping
    public List<Conductor> listarConductores() {
        return conductorService.listarConductores();
    }

    @PutMapping("/{id}/deshabilitar")
    public void deshabilitarConductor(@PathVariable Long id) {
        conductorService.deshabilitarConductor(id);
    }
}
