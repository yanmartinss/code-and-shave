package br.com.code_and_shave.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.code_and_shave.model.Usuario;
import br.com.code_and_shave.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*") // Para permitir requisições externas
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.salvarUsuario(usuario);
        return ResponseEntity.ok(novoUsuario);
    }
}
