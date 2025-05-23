package com.corhuila.backend.models.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String nombreCompleto;

    private String fotoPerfilUrl;

    @Column(name = "verificado")
    private boolean verificado = false; // Inicia como false

    @Column(name = "token_verificacion")
    private String tokenVerificacion; // Para verificar correo

    @Column(name = "token_recuperacion")
    private String tokenRecuperacion; // Para recuperar contraseña

    @Column(name = "expiracion_token")
    private LocalDateTime expiracionToken; // Fecha de expiración
}
