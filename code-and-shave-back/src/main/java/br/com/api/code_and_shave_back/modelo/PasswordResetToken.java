package br.com.api.code_and_shave_back.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "password_reset_tokens")
@Getter
@Setter
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModelo usuario;

    private LocalDateTime expiryDate;

    public PasswordResetToken() {}

    public PasswordResetToken(UsuarioModelo usuario) {
        this.token = UUID.randomUUID().toString();
        this.usuario = usuario;
        this.expiryDate = LocalDateTime.now().plusHours(1); // Expira em 1 hora
    }
}
