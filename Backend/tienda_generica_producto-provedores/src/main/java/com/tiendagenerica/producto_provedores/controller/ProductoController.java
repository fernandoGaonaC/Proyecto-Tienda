package com.tiendagenerica.producto_provedores.controller;

import com.tiendagenerica.producto_provedores.model.Producto;
import com.tiendagenerica.producto_provedores.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/catalogo")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @PostMapping("/guardar")
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productoService.crearProducto(producto));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.listarProductos());
    }

    @GetMapping("/consultar/{codigo}")
    public ResponseEntity<Producto> consultarProducto(@PathVariable Long codigo) {
        return ResponseEntity.ok(productoService.consultarProducto(codigo));
    }

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

    @DeleteMapping("/eliminar/{codigo}")
    public ResponseEntity<Map<String, String>> eliminarProducto(@PathVariable Long codigo) {
        productoService.eliminarProducto(codigo);
        return ResponseEntity.ok(Map.of("mensaje", "Datos del Producto Borrados"));
    }

    @PostMapping("/guardar-masivo")
    public ResponseEntity<?> guardarMasivo(@RequestBody List<Producto> productos) {
        List<Producto> guardados = new ArrayList<>();
        List<String> errores = new ArrayList<>();

        for (Producto p : productos) {
            try {
                // Intenta consultar si ya existe
                productoService.consultarProducto(p.getCodigoProducto());
                // Si llega aquí, existe → actualiza
                guardados.add(productoService.actualizarProducto(p.getCodigoProducto(), p));
            } catch (Exception e) {
                // No existe → crea
                try {
                    guardados.add(productoService.crearProducto(p));
                } catch (Exception ex) {
                    errores.add("Código " + p.getCodigoProducto() + ": " + ex.getMessage());
                }
            }
        }

        if (!errores.isEmpty()) {
            return ResponseEntity.status(HttpStatus.MULTI_STATUS)
                    .body(Map.of(
                            "guardados", guardados,
                            "errores", errores
                    ));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(guardados);
    }
}