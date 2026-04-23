package com.tiendagenerica.producto_provedores.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "proveedores")
@Data
@NoArgsConstructor
public class Proveedor {

    @Id
    @Column(name = "nitproveedor")
    private Long nitProveedor;

    @Column(name = "nombre_proveedor", nullable = false)
    private String nombreProveedor;

    @Column(name = "direccion_proveedor")
    private String direccionProveedor;

    @Column(name = "telefono_proveedor")
    private String telefonoProveedor;

    @Column(name = "ciudad_proveedor")
    private String ciudadProveedor;

    @Column(name = "fecha_registro", updatable = false)
    private LocalDateTime fechaRegistro;

    @PrePersist
    protected void onCreate() {
        fechaRegistro = LocalDateTime.now();
    }
}