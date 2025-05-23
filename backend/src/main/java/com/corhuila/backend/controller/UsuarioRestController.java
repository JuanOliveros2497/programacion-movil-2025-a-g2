package com.corhuila.backend.controller;

import com.corhuila.backend.models.entity.Usuario;
import com.corhuila.backend.models.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")  // Puedes restringir el origen si es necesario
public class UsuarioRestController {

    @Autowired
    private IUsuarioService usuarioService;

    @GetMapping
    public List<Usuario> findAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> findById(@PathVariable Long id) {
        Usuario usuario = usuarioService.findById(id);
        return usuario != null ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();
    }

    @PostMapping("/registro")
    public Usuario save(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> update(@RequestBody Usuario usuario, @PathVariable Long id) {
        Usuario usuarioActualizado = usuarioService.update(usuario, id);
        return usuarioActualizado != null ? ResponseEntity.ok(usuarioActualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        usuarioService.delete(id);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Usuario> findByUsername(@PathVariable String username) {
        Usuario usuario = usuarioService.findByUsername(username);
        return usuario != null ? ResponseEntity.ok(usuario) : ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String emailOrUsername = credentials.get("emailOrUsername");
            String password = credentials.get("password");
            Usuario usuario = usuarioService.login(emailOrUsername, password);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/verificar")
    public ResponseEntity<?> verificarCuenta(@RequestParam String token) {
        try {
            usuarioService.verificarCuenta(token);
            return ResponseEntity.ok("Cuenta verificada con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/solicitar-recuperacion")
    public ResponseEntity<?> solicitarRecuperacion(@RequestBody Map<String, String> request) {
        try {
            usuarioService.solicitarRecuperacion(request.get("email"));
            return ResponseEntity.ok("Correo de recuperación enviado");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/restablecer-contraseña")
    public ResponseEntity<?> restablecerContraseña(
            @RequestParam String token,
            @RequestBody Map<String, String> request) {
        try {
            usuarioService.restablecerContraseña(token, request.get("nuevaContraseña"));
            return ResponseEntity.ok("Contraseña restablecida con éxito");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{id}/avatar")
    public ResponseEntity<Usuario> uploadAvatar(
            @PathVariable Long id,
            @RequestParam("avatar") MultipartFile file) {

        try {
            Usuario usuarioActualizado = usuarioService.updateAvatar(id, file);
            return ResponseEntity.ok(usuarioActualizado);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/validar-token-recuperacion")
    public ResponseEntity<?> validarTokenRecuperacion(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            if (token == null || token.isBlank()) {
                return ResponseEntity.badRequest().body(
                        Map.of("success", false, "message", "Token no proporcionado")
                );
            }

            boolean valido = usuarioService.validarTokenRecuperacion(token);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "valid", valido,
                    "message", "Token válido"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "valid", false,
                    "message", e.getMessage()
            ));
        }
    }
}