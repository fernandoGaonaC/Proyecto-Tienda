package com.tiendagenerica.producto_provedores.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
public class Producto {

    @Id
    @Column(name = "codigo_producto")
    private Long codigoProducto;

    @Column(name = "nombre_producto", nullable = false)
    private String nombreProducto;

    @Column(name = "precio_compra", nullable = false)
    private Double precioCompra;

    @Column(name = "precio_venta", nullable = false)
    private Double precioVenta;

    @Column(name = "ivacompra", nullable = false)
    private Double ivaCompra;

    @Column(name = "nitproveedor", nullable = false)
    private Long nitProveedor;

    @Column(name = "activo")
    private Boolean activo = true;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        activo = true;
    }
}