// controller/ReporteController.java
package com.tiendagenerica.ventas_reportes.controller;

import com.tiendagenerica.ventas_reportes.service.ReporteService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reportes")
@RequiredArgsConstructor
public class ReporteController {

    private final ReporteService reporteService;

    // GET /api/ventas/reportes/por-cliente
    @GetMapping("/por-cliente")
    public ResponseEntity<List<Map<String, Object>>> totalPorCliente() {
        return ResponseEntity.ok(reporteService.totalVentasPorCliente());
    }

    // GET /api/ventas/reportes/resumen
    @GetMapping("/resumen")
    public ResponseEntity<Map<String, Object>> resumenGeneral() {
        return ResponseEntity.ok(reporteService.resumenGeneral());
    }

    // GET /api/ventas/reportes/entre-fechas?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
    @GetMapping("/entre-fechas")
    public ResponseEntity<List<Map<String, Object>>> entresFechas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fin) {
        return ResponseEntity.ok(reporteService.ventasEntreFechas(inicio, fin));
    }
}