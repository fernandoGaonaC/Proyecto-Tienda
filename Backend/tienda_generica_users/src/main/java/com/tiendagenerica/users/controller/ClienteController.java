package com.tiendagenerica.users.controller;

import com.tiendagenerica.users.model.Cliente;
import com.tiendagenerica.users.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {

    private final ClienteService clienteService;

    // POST /api/usuarios/clientes/guardar
    @PostMapping("/guardar")
    public ResponseEntity<Cliente> crearCliente(@RequestBody Cliente cliente) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(clienteService.crearCliente(cliente));
    }

    // GET /api/usuarios/clientes/listar
    @GetMapping("/listar")
    public ResponseEntity<List<Cliente>> listarClientes() {
        return ResponseEntity.ok(clienteService.listarClientes());
    }

    // GET /api/usuarios/clientes/consultar/{cedula}
    @GetMapping("/consultar/{cedula}")
    public ResponseEntity<Cliente> consultarCliente(@PathVariable Long cedula) {
        return ResponseEntity.ok(clienteService.consultarCliente(cedula));
    }

    // PUT /api/usuarios/clientes/actualizar/{cedula}
    @PutMapping("/actualizar/{cedula}")
    public ResponseEntity<Cliente> actualizarCliente(
            @PathVariable Long cedula,
            @RequestBody Cliente cliente) {
        return ResponseEntity.ok(clienteService.actualizarCliente(cedula, cliente));
    }

    // DELETE /api/usuarios/clientes/eliminar/{cedula}
    @DeleteMapping("/eliminar/{cedula}")
    public ResponseEntity<Map<String, String>> eliminarCliente(@PathVariable Long cedula) {
        clienteService.eliminarCliente(cedula);
        return ResponseEntity.ok(Map.of("mensaje", "Datos del Cliente Borrados"));
    }
}