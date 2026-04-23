// service/ReporteService.java
package com.tiendagenerica.ventas_reportes.service;

import com.tiendagenerica.ventas_reportes.repository.VentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReporteService {

    private final VentaRepository ventaRepository;

    // Reporte HU-023: Total de ventas por cliente
    @Transactional(readOnly = true)
    public List<Map<String, Object>> totalVentasPorCliente() {
        List<Object[]> resultados = ventaRepository.totalVentasPorCliente();
        List<Map<String, Object>> reporte = new ArrayList<>();

        for (Object[] fila : resultados) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("cedulaCliente", fila[0]);
            item.put("totalVentas", fila[1]);
            reporte.add(item);
        }
        return reporte;
    }

    // Reporte: ventas entre fechas
    @Transactional(readOnly = true)
    public List<Map<String, Object>> ventasEntreFechas(
            LocalDateTime inicio, LocalDateTime fin) {

        var ventas = ventaRepository.ventasEntreFechas(inicio, fin);
        List<Map<String, Object>> reporte = new ArrayList<>();

        for (var venta : ventas) {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("codigoVenta", venta.getCodigoVenta());
            item.put("cedulaCliente", venta.getCedulaCliente());
            item.put("cedulaUsuario", venta.getCedulaUsuario());
            item.put("totalVenta", venta.getTotalVenta());
            item.put("fechaVenta", venta.getFechaVenta());
            reporte.add(item);
        }
        return reporte;
    }

    // Reporte: resumen general
    @Transactional(readOnly = true)
    public Map<String, Object> resumenGeneral() {
        var ventas = ventaRepository.findAll();
        double totalGeneral = ventas.stream()
                .mapToDouble(v -> v.getTotalVenta()).sum();

        Map<String, Object> resumen = new LinkedHashMap<>();
        resumen.put("totalVentas", ventas.size());
        resumen.put("totalRecaudado", totalGeneral);
        return resumen;
    }
}