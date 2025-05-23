package com.corhuila.backend.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.corhuila.backend.models.entity.Usuario;
import java.util.Optional;

@Repository
public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email); // Para validar login/registro
    Optional<Usuario> findByUsername(String username); // Para validar username único
    // Nuevos métodos para verificación y recuperación
    Optional<Usuario> findByTokenVerificacion(String tokenVerificacion);
    Optional<Usuario> findByTokenRecuperacion(String tokenRecuperacion);
}