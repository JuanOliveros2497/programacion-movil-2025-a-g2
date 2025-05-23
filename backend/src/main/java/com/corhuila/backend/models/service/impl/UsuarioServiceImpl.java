package com.corhuila.backend.models.service.impl;

import com.corhuila.backend.models.entity.Usuario;
import com.corhuila.backend.models.dao.IUsuarioRepository;
import com.corhuila.backend.models.service.EmailService;
import com.corhuila.backend.models.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


import java.time.LocalDateTime;
import java.util.*;


@Service
public class UsuarioServiceImpl implements IUsuarioService {

    private final String UPLOAD_DIR = "src/main/resources/static/uploads/";

    @Autowired
    private EmailService emailService; // El servicio de correo que ya creaste

    private String generarToken() {
        return UUID.randomUUID().toString(); // Genera un token único
    }
    private final IUsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(IUsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Override
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public Usuario save(Usuario usuario) {
        // Validaciones existentes (email y username únicos)
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }
        if (usuarioRepository.findByUsername(usuario.getUsername()).isPresent()) {
            throw new RuntimeException("El username ya existe");
        }

        // Encriptar contraseña y generar token de verificación
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuario.setTokenVerificacion(generarToken());
        usuario.setVerificado(false); // Cuenta no verificada al registrarse

        // Guardar y enviar correo
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        enviarCorreoVerificacion(usuarioGuardado);
        return usuarioGuardado;
    }

    @Override
    public boolean verificarCuenta(String token) {
        Usuario usuario = usuarioRepository.findByTokenVerificacion(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        usuario.setVerificado(true);
        usuario.setTokenVerificacion(null); // Eliminar token después de usar
        usuarioRepository.save(usuario);
        return true;
    }

    private void enviarCorreoVerificacion(Usuario usuario) {
        String asunto = "Verifica tu cuenta";
        String mensaje = "Hola " + usuario.getNombreCompleto() + ",\n\n"
                + "Por favor verifica tu cuenta con este código: " + usuario.getTokenVerificacion() + "\n\n"
                + "O haz clic aquí: https://skylark-active-viper.ngrok-free.app/api/usuarios/verificar?token=" + usuario.getTokenVerificacion();

        emailService.enviarEmail(usuario.getEmail(), asunto, mensaje);
    }

    @Override
    public void solicitarRecuperacion(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email no registrado"));

        // Generar token con expiración (1 hora)
        String token = generarToken();
        usuario.setTokenRecuperacion(token);
        usuario.setExpiracionToken(LocalDateTime.now().plusHours(1));
        usuarioRepository.save(usuario);

        enviarCorreoRecuperacion(usuario, token);
    }

    private void enviarCorreoRecuperacion(Usuario usuario, String token) {
        String asunto = "Recuperación de contraseña - TuApp";
        String mensaje = "Hola " + usuario.getNombreCompleto() + ",\n\n"
                + "Código de recuperación: " + token + "\n\n"
                + "Ingresa este código en la app para restablecer tu contraseña.\n\n"
                + "Si no solicitaste esto, ignora este correo.";

        emailService.enviarEmail(usuario.getEmail(), asunto, mensaje);
    }

    @Override
    public void restablecerContraseña(String token, String nuevaContraseña) {
        Usuario usuario = usuarioRepository.findByTokenRecuperacion(token)
                .filter(u -> u.getExpiracionToken().isAfter(LocalDateTime.now()))
                .orElseThrow(() -> new RuntimeException("Token inválido o expirado"));

        usuario.setPassword(passwordEncoder.encode(nuevaContraseña));
        usuario.setTokenRecuperacion(null); // Eliminar token después de usar
        usuario.setExpiracionToken(null);
        usuarioRepository.save(usuario);
    }

    @Override
    public Usuario update(Usuario usuario, Long id) {
        Usuario usuarioExistente = findById(id);
        if (usuarioExistente != null) {
            usuarioExistente.setNombreCompleto(usuario.getNombreCompleto());
            usuarioExistente.setFotoPerfilUrl(usuario.getFotoPerfilUrl());
            // No actualizar email/username/password directamente
            return usuarioRepository.save(usuarioExistente);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public Usuario findByUsername(String username) {
        return usuarioRepository.findByUsername(username).orElse(null);
    }

    @Override
    public Usuario login(String emailOrUsername, String password) {
        // Primero intenta buscar por email
        Optional<Usuario> usuarioPorEmail = usuarioRepository.findByEmail(emailOrUsername);

        // Si no lo encuentra por email, busca por username
        Optional<Usuario> usuarioPorUsername = usuarioPorEmail.isPresent()
                ? Optional.empty()
                : usuarioRepository.findByUsername(emailOrUsername);

        // Combina los resultados
        Usuario usuario = usuarioPorEmail.or(() -> usuarioPorUsername)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verifica la contraseña
        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // Verifica si la cuenta está verificada
        if (!usuario.isVerificado()) {
            throw new RuntimeException("Debes verificar tu correo electrónico antes de iniciar sesión");
        }

        return usuario;
    }

    @Override
    public Usuario updateAvatar(Long userId, MultipartFile file) throws IOException {
        // 1. Validar que el archivo no esté vacío
        if (file.isEmpty()) {
            throw new RuntimeException("El archivo está vacío");
        }

        // 2. Crear directorio si no existe
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 3. Generar nombre único para evitar colisiones
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // 4. Guardar el archivo
        Files.copy(file.getInputStream(), filePath);

        // 5. Actualizar usuario en la base de datos
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Guarda la ruta relativa (ej: "/uploads/foto.jpg")
        usuario.setFotoPerfilUrl("/uploads/" + fileName);

        return usuarioRepository.save(usuario);

    }
    @Override
    public boolean validarTokenRecuperacion(String token) {
        // Verifica que el token existe y no ha expirado
        Optional<Usuario> usuarioOpt = usuarioRepository.findByTokenRecuperacion(token);

        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Token de recuperación no válido");
        }

        Usuario usuario = usuarioOpt.get();

        if (usuario.getExpiracionToken() == null ||
                usuario.getExpiracionToken().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token de recuperación ha expirado");
        }

        return true;
    }
}