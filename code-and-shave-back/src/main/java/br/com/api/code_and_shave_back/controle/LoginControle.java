package br.com.api.code_and_shave_back.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.servico.LoginServico;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class LoginControle {

    // antes era UsuarioServico!
    @Autowired
    private LoginServico loginServico; // Alterado para LoginServico

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioModelo usuario) {
        return loginServico.login(usuario.getEMAIL(), usuario.getSENHA()); // Agora chamamos loginServico
    }
}