package br.com.code_and_shave.controllers;

import br.com.code_and_shave.model.Cliente;
import br.com.code_and_shave.repositories.ClienteRepository;
import br.com.code_and_shave.services.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recuperacao-senha")
public class RecuperacaoSenhaController {

    @Autowired
    private EmailService emailService;
    private ClienteRepository clienteRepository;

    @PostMapping
    public ResponseEntity<?> solicitarRecuperacaoSenha(@RequestParam String email) {
        // Verificar se o e-mail existe no sistema
        Cliente cliente = clienteRepository.findByEmail(email);
        if (cliente == null) {
            return ResponseEntity.status(404).body("E-mail não encontrado");
        }

        // Gerar link de redefinição de senha (aqui, simulado)
        String link = "http://localhost:3000/redefinir-senha?token=TOKEN_EXEMPLO";
        emailService.enviarEmail(email, "Recuperação de senha", "Clique no link para redefinir sua senha: " + link);

        return ResponseEntity.ok("E-mail de recuperação enviado com sucesso!");
    }
    
}

