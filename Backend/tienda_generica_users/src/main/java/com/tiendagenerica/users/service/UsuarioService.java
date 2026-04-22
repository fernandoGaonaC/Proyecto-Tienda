package com.tiendagenerica.users.service;

import com.tiendagenerica.users.exception.ResourceNotFoundException;
import com.tiendagenerica.users.model.Usuario;
import com.tiendagenerica.users.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    // HU-002: Crear usuario
    @Transactional
    public Usuario crearUsuario(Usuario usuario) {
        if (usuarioRepository.existsById(usuario.getCedulaUsuario())) {
            throw new IllegalArgumentException(
                    "Ya existe un usuario con la cédula " + usuario.getCedulaUsuario());
        }
        if (usuarioRepository.existsByUsuario(usuario.getUsuario())) {
            throw new IllegalArgumentException(
                    "El nombre de usuario '" + usuario.getUsuario() + "' ya está en uso");
        }
        if (usuarioRepository.existsByEmailUsuario(usuario.getEmailUsuario())) {
            throw new IllegalArgumentException(
                    "El correo '" + usuario.getEmailUsuario() + "' ya está registrado");
        }
        usuario.setActivo(true);
        return usuarioRepository.save(usuario);
    }

    // HU-003: Consultar usuario por cédula
    @Transactional(readOnly = true)
    public Usuario consultarUsuario(Long cedula) {
        return usuarioRepository.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario Inexistente: cédula " + cedula + " no encontrada"));
    }

    // HU-004: Actualizar datos de usuario
    @Transactional
    public Usuario actualizarUsuario(Long cedula, Usuario datosNuevos) {
        Usuario usuarioExistente = consultarUsuario(cedula);
        usuarioExistente.setNombreUsuario(datosNuevos.getNombreUsuario());
        usuarioExistente.setEmailUsuario(datosNuevos.getEmailUsuario());
        usuarioExistente.setUsuario(datosNuevos.getUsuario());
        if (datosNuevos.getPassword() != null && !datosNuevos.getPassword().isBlank()) {
            usuarioExistente.setPassword(datosNuevos.getPassword());
        }
        return usuarioRepository.save(usuarioExistente);
    }

    // HU-005: Borrar usuario
    @Transactional
    public void eliminarUsuario(Long cedula) {
        Usuario usuario = consultarUsuario(cedula);
        usuarioRepository.delete(usuario);
    }

    // HU-021: Listar todos los usuarios (reporte)
    @Transactional(readOnly = true)
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // HU-001: Login del sistema
    @Transactional(readOnly = true)
    public Usuario login(Map<String, String> credenciales) {
        String nombreUsuario = credenciales.get("usuario");
        String password = credenciales.get("password");

        if (nombreUsuario == null || password == null) {
            throw new IllegalArgumentException("Faltan datos del usuario");
        }

        return usuarioRepository.findByUsuario(nombreUsuario)
                .filter(u -> u.getPassword().equals(password))
                .filter(u -> Boolean.TRUE.equals(u.getActivo()))
                .orElseThrow(() -> new IllegalArgumentException(
                        "Usuario o contraseña errados, intente de nuevo"));
    }
}