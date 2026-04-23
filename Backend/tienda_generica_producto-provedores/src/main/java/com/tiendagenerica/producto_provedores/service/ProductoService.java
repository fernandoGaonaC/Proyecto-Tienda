// service/ProductoService.java
package com.tiendagenerica.producto_provedores.service;

import com.tiendagenerica.producto_provedores.exception.ResourceNotFoundException;
import com.tiendagenerica.producto_provedores.model.Producto;
import com.tiendagenerica.producto_provedores.repository.ProductoRepository;
import com.tiendagenerica.producto_provedores.repository.ProveedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final ProveedorRepository proveedorRepository;

    // Crear producto
    @Transactional
    public Producto crearProducto(Producto producto) {
        if (productoRepository.existsById(producto.getCodigoProducto())) {
            throw new IllegalArgumentException(
                    "Ya existe un producto con el código " + producto.getCodigoProducto());
        }
        if (!proveedorRepository.existsById(producto.getNitProveedor())) {
            throw new IllegalArgumentException(
                    "El proveedor con NIT " + producto.getNitProveedor() + " no existe");
        }
        return productoRepository.save(producto);
    }

    // Consultar producto por código
    @Transactional(readOnly = true)
    public Producto consultarProducto(Long codigo) {
        return productoRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto Inexistente: código " + codigo + " no encontrado"));
    }

    // Actualizar producto
    @Transactional
    public Producto actualizarProducto(Long codigo, Producto datosNuevos) {
        Producto existente = consultarProducto(codigo);
        if (!proveedorRepository.existsById(datosNuevos.getNitProveedor())) {
            throw new IllegalArgumentException(
                    "El proveedor con NIT " + datosNuevos.getNitProveedor() + " no existe");
        }
        existente.setNombreProducto(datosNuevos.getNombreProducto());
        existente.setPrecioCompra(datosNuevos.getPrecioCompra());
        existente.setPrecioVenta(datosNuevos.getPrecioVenta());
        existente.setIvaCompra(datosNuevos.getIvaCompra());
        existente.setNitProveedor(datosNuevos.getNitProveedor());
        existente.setActivo(datosNuevos.getActivo());
        return productoRepository.save(existente);
    }

    // Eliminar producto
    @Transactional
    public void eliminarProducto(Long codigo) {
        Producto producto = consultarProducto(codigo);
        productoRepository.delete(producto);
    }

    // Listar todos los productos
    @Transactional(readOnly = true)
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    // Listar productos por proveedor
    @Transactional(readOnly = true)
    public List<Producto> listarProductosPorProveedor(Long nit) {
        if (!proveedorRepository.existsById(nit)) {
            throw new ResourceNotFoundException(
                    "Proveedor Inexistente: NIT " + nit + " no encontrado");
        }
        return productoRepository.findByNitProveedor(nit);
    }
}