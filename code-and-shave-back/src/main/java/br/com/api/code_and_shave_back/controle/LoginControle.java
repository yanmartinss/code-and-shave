package br.com.api.code_and_shave_back.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.servico.UsuarioServico;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth") // Endpoint para autenticação
public class LoginControle {

    @Autowired
    private UsuarioServico usuarioServico;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioModelo usuario) {
        return usuarioServico.login(usuario.getEMAIL(), usuario.getSENHA());
    }
}
