// controller/ProveedorController.java
package com.tiendagenerica.producto_provedores.controller;

import com.tiendagenerica.producto_provedores.model.Proveedor;
import com.tiendagenerica.producto_provedores.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/proveedores")
@RequiredArgsConstructor
public class ProveedorController {

    private final ProveedorService proveedorService;

    // POST /api/productos/proveedores/guardar
    @PostMapping("/guardar")
    public ResponseEntity<Proveedor> crearProveedor(@RequestBody Proveedor proveedor) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(proveedorService.crearProveedor(proveedor));
    }

    // GET /api/productos/proveedores/listar
    @GetMapping("/listar")
    public ResponseEntity<List<Proveedor>> listarProveedores() {
        return ResponseEntity.ok(proveedorService.listarProveedores());
    }

    // GET /api/productos/proveedores/consultar/{nit}
    @GetMapping("/consultar/{nit}")
    public ResponseEntity<Proveedor> consultarProveedor(@PathVariable Long nit) {
        return ResponseEntity.ok(proveedorService.consultarProveedor(nit));
    }

    // PUT /api/productos/proveedores/actualizar/{nit}
    @PutMapping("/actualizar/{nit}")
    public ResponseEntity<Proveedor> actualizarProveedor(
            @PathVariable Long nit,
            @RequestBody Proveedor proveedor) {
        return ResponseEntity.ok(proveedorService.actualizarProveedor(nit, proveedor));
    }

    // DELETE /api/productos/proveedores/eliminar/{nit}
    @DeleteMapping("/eliminar/{nit}")
    public ResponseEntity<Map<String, String>> eliminarProveedor(@PathVariable Long nit) {
        proveedorService.eliminarProveedor(nit);
        return ResponseEntity.ok(Map.of("mensaje", "Datos del Proveedor Borrados"));
    }
}