package com.tiendagenerica.producto_provedores.controller;

import com.tiendagenerica.producto_provedores.model.Producto;
import com.tiendagenerica.producto_provedores.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/catalogo")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    // POST /api/productos/catalogo/guardar
    @PostMapping("/guardar")
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productoService.crearProducto(producto));
    }

    // GET /api/productos/catalogo/listar
    @GetMapping("/listar")
    public ResponseEntity<List<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.listarProductos());
    }

    // GET /api/productos/catalogo/consultar/{codigo}
    @GetMapping("/consultar/{codigo}")
    public ResponseEntity<Producto> consultarProducto(@PathVariable Long codigo) {
        return ResponseEntity.ok(productoService.consultarProducto(codigo));
    }

    // GET /api/productos/catalogo/proveedor/{nit}
    @GetMapping("/proveedor/{nit}")
    public ResponseEntity<List<Producto>> listarPorProveedor(@PathVariable Long nit) {
        return ResponseEntity.ok(productoService.listarProductosPorProveedor(nit));
    }

    @PutMapping("/actualizar/{codigo}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Long codigo,
            @RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.actualizarProducto(codigo, producto));
    }

    // DELETE /api/productos/catalogo/eliminar/{codigo}
    @DeleteMapping("/eliminar/{codigo}")
    public ResponseEntity<Map<String, String>> eliminarProducto(@PathVariable Long codigo) {
        productoService.eliminarProducto(codigo);
        return ResponseEntity.ok(Map.of("mensaje", "Datos del Producto Borrados"));
    }
}