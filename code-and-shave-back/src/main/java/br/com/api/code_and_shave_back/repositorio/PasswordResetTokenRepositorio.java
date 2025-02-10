package br.com.api.code_and_shave_back.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.api.code_and_shave_back.modelo.PasswordResetToken;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepositorio extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);

    // 🔥 Buscar token pelo usuário (único, sem duplicação)
    PasswordResetToken findByUsuario(UsuarioModelo usuario);
}

