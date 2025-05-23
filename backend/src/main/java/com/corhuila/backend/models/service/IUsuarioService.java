package com.corhuila.backend.models.service;

import com.corhuila.backend.models.entity.Usuario;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IUsuarioService {
    List<Usuario> findAll();
    Usuario findById(Long id);
    Usuario save(Usuario usuario); // Registro (encripta password)
    Usuario update(Usuario usuario, Long id);
    void delete(Long id);
    Usuario findByUsername(String username); // Para perfil
    Usuario login(String emailOrUsername, String password);    boolean verificarCuenta(String token);
    void solicitarRecuperacion(String email);
    void restablecerContraseña(String token, String nuevaContraseña);
    Usuario updateAvatar(Long userId, MultipartFile file) throws IOException;
    // En IUsuarioService.java
    boolean validarTokenRecuperacion(String token);
}