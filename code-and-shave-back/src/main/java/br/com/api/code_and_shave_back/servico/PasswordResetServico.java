package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.api.code_and_shave_back.modelo.PasswordResetToken;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.repositorio.PasswordResetTokenRepositorio;
import br.com.api.code_and_shave_back.repositorio.UsuarioRepositorio;

import java.time.LocalDateTime;

@Service
public class PasswordResetServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private PasswordResetTokenRepositorio tokenRepositorio;

    @Autowired
    private JavaMailSender mailSender;

    @Transactional
    public void generateResetToken(String email) {
        UsuarioModelo usuario = usuarioRepositorio.findByEMAIL(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // 🔥 Verifica se já existe um token para este usuário
        PasswordResetToken existingToken = tokenRepositorio.findByUsuario(usuario);
        if (existingToken != null) {
            // Se já existe um token, apenas atualiza a expiração e reenvia o email
            existingToken.setExpiryDate(LocalDateTime.now().plusHours(1));
            tokenRepositorio.save(existingToken);
            sendResetEmail(usuario.getEMAIL(), existingToken.getToken());
            return;
        }

        // 🔥 Criar um novo token e salvar caso não exista um anterior
        PasswordResetToken newToken = new PasswordResetToken(usuario);
        tokenRepositorio.save(newToken);

        sendResetEmail(usuario.getEMAIL(), newToken.getToken());
    }

    private void sendResetEmail(String email, String token) {
        String link = "http://localhost:3000/reset-password?token=" + token;
        String message = "Clique no link para redefinir sua senha: " + link;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Recuperação de Senha");
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }

    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepositorio.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido ou expirado"));

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expirado");
        }

        UsuarioModelo usuario = resetToken.getUsuario();
        usuario.setSENHA(new BCryptPasswordEncoder().encode(newPassword));
        usuarioRepositorio.save(usuario);

        // 🔥 Deleta o token após redefinição de senha bem-sucedida
        tokenRepositorio.delete(resetToken);
    }
}
