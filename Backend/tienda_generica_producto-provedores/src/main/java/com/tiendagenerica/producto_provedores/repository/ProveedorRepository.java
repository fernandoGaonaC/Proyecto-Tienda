package com.tiendagenerica.producto_provedores.repository;

import com.tiendagenerica.producto_provedores.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    boolean existsByNombreProveedor(String nombre);
}