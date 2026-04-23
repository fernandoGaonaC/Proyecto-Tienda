// model/Venta.java
package com.tiendagenerica.ventas_reportes.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ventas")
@Data
@NoArgsConstructor
public class Venta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "codigo_venta")
    private Long codigoVenta;

    @Column(name = "cedula_cliente", nullable = false)
    private Long cedulaCliente;

    @Column(name = "cedula_usuario", nullable = false)
    private Long cedulaUsuario;

    @Column(name = "valor_venta", nullable = false)
    private Double valorVenta;

    @Column(name = "ivaventa", nullable = false)
    private Double ivaVenta;

    @Column(name = "total_venta", nullable = false)
    private Double totalVenta;

    @Column(name = "fecha_venta", updatable = false)
    private LocalDateTime fechaVenta;

    // Relación con detalles — solo existe en Java, no crea FK cross-DB
    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<DetalleVenta> detalles;

    @PrePersist
    protected void onCreate() {
        fechaVenta = LocalDateTime.now();
    }
}