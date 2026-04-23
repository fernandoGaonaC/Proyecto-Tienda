-- =====================================================
-- MICROSERVICIO 1: USERS (Gestión de Usuarios y Clientes)
-- Base de datos: tienda_generica_users
-- =====================================================
CREATE DATABASE IF NOT EXISTS tienda_generica_users;

USE tienda_generica_users;

-- Tabla de usuarios del sistema (empleados)
CREATE TABLE usuarios (
    cedula_usuario BIGINT(20) PRIMARY KEY,
    nombre_usuario VARCHAR(255) NOT NULL,
    email_usuario VARCHAR(255) NOT NULL UNIQUE,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de clientes
CREATE TABLE clientes (
    cedula_cliente BIGINT(20) PRIMARY KEY,
    nombre_cliente VARCHAR(255) NOT NULL,
    direccion_cliente VARCHAR(255),
    telefono_cliente VARCHAR(255),
    email_cliente VARCHAR(255) UNIQUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);