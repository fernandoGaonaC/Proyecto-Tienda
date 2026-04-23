package com.tiendagenerica.users.repository;

import com.tiendagenerica.users.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsuario(String usuario);
    boolean existsByUsuario(String usuario);
    boolean existsByEmailUsuario(String email);
}