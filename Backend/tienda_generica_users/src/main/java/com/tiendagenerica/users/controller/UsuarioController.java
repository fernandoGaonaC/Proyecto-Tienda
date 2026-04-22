package com.tiendagenerica.users.controller;

import com.tiendagenerica.users.model.Usuario;
import com.tiendagenerica.users.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    // POST /api/usuarios/login
    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Map<String, String> credenciales) {
        return ResponseEntity.ok(usuarioService.login(credenciales));
    }

    // POST /api/usuarios/guardar
    @PostMapping("/guardar")
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(usuarioService.crearUsuario(usuario));
    }

    // GET /api/usuarios/listar
    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    // GET /api/usuarios/consultar/{cedula}
    @GetMapping("/consultar/{cedula}")
    public ResponseEntity<Usuario> consultarUsuario(@PathVariable Long cedula) {
        return ResponseEntity.ok(usuarioService.consultarUsuario(cedula));
    }

    // PUT /api/usuarios/actualizar/{cedula}
    @PutMapping("/actualizar/{cedula}")
    public ResponseEntity<Usuario> actualizarUsuario(
            @PathVariable Long cedula,
            @RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.actualizarUsuario(cedula, usuario));
    }

    // DELETE /api/usuarios/eliminar/{cedula}
    @DeleteMapping("/eliminar/{cedula}")
    public ResponseEntity<Map<String, String>> eliminarUsuario(@PathVariable Long cedula) {
        usuarioService.eliminarUsuario(cedula);
        return ResponseEntity.ok(Map.of("mensaje", "Datos del Usuario Borrados"));
    }
}