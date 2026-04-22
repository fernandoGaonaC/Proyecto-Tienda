// repository/DetalleVentaRepository.java
package com.tiendagenerica.ventas_reportes.repository;

import com.tiendagenerica.ventas_reportes.model.DetalleVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Long> {
    List<DetalleVenta> findByCodigoProducto(Long codigoProducto);
}