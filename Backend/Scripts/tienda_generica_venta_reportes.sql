-- =====================================================
-- MICROSERVICIO 3: VENTAS-REPORTES (Gestión de Transacciones)
-- Base de datos: tienda_generica_venta_reportes
-- =====================================================
CREATE DATABASE IF NOT EXISTS tienda_generica_venta_reportes;
USE tienda_generica_venta_reportes;

-- Tabla de ventas (cabecera)
CREATE TABLE ventas (
    codigo_venta BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    cedula_cliente BIGINT(20) NOT NULL,
    cedula_usuario BIGINT(20) NOT NULL,
    valor_venta DOUBLE NOT NULL,
    ivaventa DOUBLE NOT NULL,
    total_venta DOUBLE NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Nota: No hay FOREIGN KEYS hacia clientes/usuarios porque están en otro servicio
    -- Estos campos solo almacenan los IDs para referencia
    INDEX idx_venta_cliente (cedula_cliente),
    INDEX idx_venta_usuario (cedula_usuario),
    INDEX idx_venta_fecha (fecha_venta)
);

-- Tabla de detalle de ventas
CREATE TABLE detalle_ventas (
    codigo_detalle_venta BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    codigo_venta BIGINT(20) NOT NULL,
    codigo_producto BIGINT(20) NOT NULL,
    cantidad_producto INT(11) NOT NULL,
    valor_venta DOUBLE NOT NULL,  -- Precio unitario al momento de la venta
    valoriva DOUBLE NOT NULL,      -- IVA unitario
    valor_total DOUBLE NOT NULL,   -- cantidad * (valor_venta + valoriva)
    
    -- Relación con ventas (dentro del mismo microservicio)
    FOREIGN KEY (codigo_venta) REFERENCES ventas(codigo_venta),
    
    -- Nota: No hay FK a productos porque está en otro microservicio
    INDEX idx_detalle_producto (codigo_producto)
);