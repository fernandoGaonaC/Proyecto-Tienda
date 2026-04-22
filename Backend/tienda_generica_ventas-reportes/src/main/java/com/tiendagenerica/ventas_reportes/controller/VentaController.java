// controller/VentaController.java
package com.tiendagenerica.ventas_reportes.controller;

import com.tiendagenerica.ventas_reportes.model.Venta;
import com.tiendagenerica.ventas_reportes.service.VentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/registrar")
@RequiredArgsConstructor
public class VentaController {

    private final VentaService ventaService;

    // POST /api/ventas/registrar/guardar
    @PostMapping("/guardar")
    public ResponseEntity<Venta> registrarVenta(@RequestBody Venta venta) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ventaService.registrarVenta(venta));
    }

    // GET /api/ventas/registrar/listar
    @GetMapping("/listar")
    public ResponseEntity<List<Venta>> listarVentas() {
        return ResponseEntity.ok(ventaService.listarVentas());
    }

    // GET /api/ventas/registrar/consultar/{codigo}
    @GetMapping("/consultar/{codigo}")
    public ResponseEntity<Venta> consultarVenta(@PathVariable Long codigo) {
        return ResponseEntity.ok(ventaService.consultarVenta(codigo));
    }

    // GET /api/ventas/registrar/cliente/{cedula}
    @GetMapping("/cliente/{cedula}")
    public ResponseEntity<List<Venta>> ventasPorCliente(@PathVariable Long cedula) {
        return ResponseEntity.ok(ventaService.ventasPorCliente(cedula));
    }
}