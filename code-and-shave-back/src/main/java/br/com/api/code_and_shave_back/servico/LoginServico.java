package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.api.code_and_shave_back.modelo.RespostaModelo;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.repositorio.UsuarioRepositorio;

import java.util.Optional;

@Service
public class LoginServico {
    @Autowired
    private UsuarioRepositorio ur;

    @Autowired
    private RespostaModelo rm;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> login(String email, String senha) {
        Optional<UsuarioModelo> usuarioOpt = ur.findByEMAIL(email);

        if (usuarioOpt.isEmpty()) {
            rm.setMensagem("Usuário não encontrado");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        UsuarioModelo usuario = usuarioOpt.get();

        if (!encoder.matches(senha, usuario.getSENHA())) {
            rm.setMensagem("Senha incorreta");
            return new ResponseEntity<>(rm, HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(usuario);
    }
}