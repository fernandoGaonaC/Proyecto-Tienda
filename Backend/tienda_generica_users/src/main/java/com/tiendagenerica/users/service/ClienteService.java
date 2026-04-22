package com.tiendagenerica.users.service;

import com.tiendagenerica.users.exception.ResourceNotFoundException;
import com.tiendagenerica.users.model.Cliente;
import com.tiendagenerica.users.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    // HU-006: Crear cliente
    @Transactional
    public Cliente crearCliente(Cliente cliente) {
        if (clienteRepository.existsById(cliente.getCedulaCliente())) {
            throw new IllegalArgumentException(
                    "Ya existe un cliente con la cédula " + cliente.getCedulaCliente());
        }
        if (cliente.getEmailCliente() != null &&
                clienteRepository.existsByEmailCliente(cliente.getEmailCliente())) {
            throw new IllegalArgumentException(
                    "El correo '" + cliente.getEmailCliente() + "' ya está registrado");
        }
        return clienteRepository.save(cliente);
    }

    // HU-007: Consultar cliente por cédula
    @Transactional(readOnly = true)
    public Cliente consultarCliente(Long cedula) {
        return clienteRepository.findById(cedula)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cliente Inexistente: cédula " + cedula + " no encontrada"));
    }

    // HU-008: Actualizar datos del cliente
    @Transactional
    public Cliente actualizarCliente(Long cedula, Cliente datosNuevos) {
        Cliente clienteExistente = consultarCliente(cedula);
        clienteExistente.setNombreCliente(datosNuevos.getNombreCliente());
        clienteExistente.setDireccionCliente(datosNuevos.getDireccionCliente());
        clienteExistente.setTelefonoCliente(datosNuevos.getTelefonoCliente());
        clienteExistente.setEmailCliente(datosNuevos.getEmailCliente());
        return clienteRepository.save(clienteExistente);
    }

    // HU-009: Borrar cliente
    @Transactional
    public void eliminarCliente(Long cedula) {
        Cliente cliente = consultarCliente(cedula);
        clienteRepository.delete(cliente);
    }

    // HU-022: Listar todos los clientes (reporte)
    @Transactional(readOnly = true)
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }
}