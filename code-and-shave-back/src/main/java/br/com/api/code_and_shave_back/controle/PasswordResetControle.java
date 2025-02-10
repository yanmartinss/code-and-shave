package br.com.api.code_and_shave_back.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.api.code_and_shave_back.servico.PasswordResetServico;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("password")
public class PasswordResetControle {

    @Autowired
    private PasswordResetServico passwordResetServico;

    @PostMapping("/forgot")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> request) {
        passwordResetServico.generateResetToken(request.get("email"));
        return ResponseEntity.ok(Map.of("message", "Token de recuperação enviado para o email."));
    }


    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        passwordResetServico.resetPassword(request.get("token"), request.get("newPassword"));
        return ResponseEntity.ok("Senha redefinida com sucesso.");
    }
}
