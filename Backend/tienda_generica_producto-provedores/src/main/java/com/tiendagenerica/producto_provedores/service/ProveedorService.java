package com.tiendagenerica.producto_provedores.service;

import com.tiendagenerica.producto_provedores.exception.ResourceNotFoundException;
import com.tiendagenerica.producto_provedores.model.Proveedor;
import com.tiendagenerica.producto_provedores.repository.ProveedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;

    // Crear proveedor
    @Transactional
    public Proveedor crearProveedor(Proveedor proveedor) {
        if (proveedorRepository.existsById(proveedor.getNitProveedor())) {
            throw new IllegalArgumentException(
                    "Ya existe un proveedor con el NIT " + proveedor.getNitProveedor());
        }
        return proveedorRepository.save(proveedor);
    }

    // Consultar proveedor por NIT
    @Transactional(readOnly = true)
    public Proveedor consultarProveedor(Long nit) {
        return proveedorRepository.findById(nit)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Proveedor Inexistente: NIT " + nit + " no encontrado"));
    }

    // Actualizar proveedor
    @Transactional
    public Proveedor actualizarProveedor(Long nit, Proveedor datosNuevos) {
        Proveedor existente = consultarProveedor(nit);
        existente.setNombreProveedor(datosNuevos.getNombreProveedor());
        existente.setDireccionProveedor(datosNuevos.getDireccionProveedor());
        existente.setTelefonoProveedor(datosNuevos.getTelefonoProveedor());
        existente.setCiudadProveedor(datosNuevos.getCiudadProveedor());
        return proveedorRepository.save(existente);
    }

    // Eliminar proveedor
    @Transactional
    public void eliminarProveedor(Long nit) {
        Proveedor proveedor = consultarProveedor(nit);
        proveedorRepository.delete(proveedor);
    }

    // Listar todos los proveedores
    @Transactional(readOnly = true)
    public List<Proveedor> listarProveedores() {
        return proveedorRepository.findAll();
    }
}