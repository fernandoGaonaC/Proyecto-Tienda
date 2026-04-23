package com.tiendagenerica.producto_provedores.repository;

import com.tiendagenerica.producto_provedores.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByNitProveedor(Long nitProveedor);
    boolean existsByNombreProducto(String nombre);
}