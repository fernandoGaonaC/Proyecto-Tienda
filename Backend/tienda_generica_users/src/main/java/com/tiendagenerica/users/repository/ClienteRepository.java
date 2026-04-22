package com.tiendagenerica.users.repository;

import com.tiendagenerica.users.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByEmailCliente(String email);
}