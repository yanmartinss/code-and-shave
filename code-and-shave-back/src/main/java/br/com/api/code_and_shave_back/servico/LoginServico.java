package br.com.api.code_and_shave_back.servico;

import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class LoginServico {

    @Autowired
    private UsuarioRepositorio ur;

    @Autowired
    private br.com.api.code_and_shave_back.utils.JwtUtil jwtUtil;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> login(String email, String senha) {
        Optional<UsuarioModelo> usuarioOpt = ur.findByEMAIL(email);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        UsuarioModelo usuario = usuarioOpt.get();

        if (!encoder.matches(senha, usuario.getSENHA())) {
            return ResponseEntity.status(401).body("Senha incorreta");
        }

        // Gera o token JWT
        String token = jwtUtil.generateToken(usuario.getEMAIL());

        // Retorna o token + dados do usuário
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("usuario", usuario);

        return ResponseEntity.ok(response);
    }
}
