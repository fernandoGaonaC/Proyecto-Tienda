// model/DetalleVenta.java
package com.tiendagenerica.ventas_reportes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "detalle_ventas")
@Data
@NoArgsConstructor
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_detalle_venta")
    private Long codigoDetalleVenta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codigo_venta", nullable = false)
    @JsonIgnore
    private Venta venta;

    @Column(name = "codigo_producto", nullable = false)
    private Long codigoProducto;

    @Column(name = "cantidad_producto", nullable = false)
    private Integer cantidadProducto;

    @Column(name = "valor_venta", nullable = false)
    private Double valorVenta;

    @Column(name = "valoriva", nullable = false)
    private Double valorIva;

    @Column(name = "valor_total", nullable = false)
    private Double valorTotal;
}