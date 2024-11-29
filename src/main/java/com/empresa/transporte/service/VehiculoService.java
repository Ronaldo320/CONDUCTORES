package com.empresa.transporte.service;

import com.empresa.transporte.model.Vehiculo;
import com.empresa.transporte.repository.VehiculoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehiculoService {
    private final VehiculoRepository vehiculoRepository;

    public VehiculoService(VehiculoRepository vehiculoRepository) {
        this.vehiculoRepository = vehiculoRepository;
    }

    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public List<Vehiculo> listarVehiculos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo editarVehiculo(Long id, Vehiculo vehiculoActualizado) {
        Vehiculo vehiculo = vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
        vehiculo.setPlaca(vehiculoActualizado.getPlaca());
        vehiculo.setTipoVehiculo(vehiculoActualizado.getTipoVehiculo());
        return vehiculoRepository.save(vehiculo);
    }

    public void deshabilitarVehiculo(Long id) {
        Vehiculo vehiculo = vehiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
        vehiculo.setActivo(false);
        vehiculoRepository.save(vehiculo);
    }
}
