-- =====================================================
-- MICROSERVICIO 2: PRODUCTO-PROVEEDOR (Gestión de Catálogo)
-- Base de datos: tienda_generica_producto_provedor
-- =====================================================
CREATE DATABASE IF NOT EXISTS tienda_generica_producto_provedor;
USE tienda_generica_producto_provedor;

-- Tabla de proveedores
CREATE TABLE proveedores (
    nitproveedor BIGINT(20) PRIMARY KEY,
    nombre_proveedor VARCHAR(255) NOT NULL,
    direccion_proveedor VARCHAR(255),
    telefono_proveedor VARCHAR(255),
    ciudad_proveedor VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    codigo_producto BIGINT(20) PRIMARY KEY,
    nombre_producto VARCHAR(255) NOT NULL,
    precio_compra DOUBLE NOT NULL,
    precio_venta DOUBLE NOT NULL,
    ivacompra DOUBLE NOT NULL,
    nitproveedor BIGINT(20) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    -- Nota: No hay FOREIGN KEY porque proveedores está en la misma BD
    -- pero sí podemos crear la relación al estar en el mismo microservicio
    FOREIGN KEY (nitproveedor) REFERENCES proveedores(nitproveedor)
);

-- Índices para búsquedas frecuentes
CREATE INDEX idx_producto_proveedor ON productos(nitproveedor);
CREATE INDEX idx_producto_nombre ON productos(nombre_producto);