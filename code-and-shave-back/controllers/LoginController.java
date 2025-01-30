package br.com.code_and_shave.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.code_and_shave.dtos.LoginDTO;
import br.com.code_and_shave.services.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<?> autenticar(@RequestBody LoginDTO loginDTO){
        try{
            String token = loginService.autenticar(loginDTO.getEmail(),loginDTO.getSenha());
            return ResponseEntity.ok(token);
        } catch (RuntimeException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

}
