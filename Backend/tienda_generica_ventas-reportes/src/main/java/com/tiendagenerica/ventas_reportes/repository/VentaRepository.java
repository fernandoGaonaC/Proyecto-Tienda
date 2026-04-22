// repository/VentaRepository.java
package com.tiendagenerica.ventas_reportes.repository;

import com.tiendagenerica.ventas_reportes.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long> {
    List<Venta> findByCedulaCliente(Long cedulaCliente);
    List<Venta> findByCedulaUsuario(Long cedulaUsuario);

    // Reporte: total vendido por cliente
    @Query("SELECT v.cedulaCliente, SUM(v.totalVenta) FROM Venta v GROUP BY v.cedulaCliente")
    List<Object[]> totalVentasPorCliente();

    // Reporte: total vendido en un rango de fechas
    @Query("SELECT v FROM Venta v WHERE v.fechaVenta BETWEEN :inicio AND :fin")
    List<Venta> ventasEntreFechas(
            @Param("inicio") java.time.LocalDateTime inicio,
            @Param("fin") java.time.LocalDateTime fin
    );
}