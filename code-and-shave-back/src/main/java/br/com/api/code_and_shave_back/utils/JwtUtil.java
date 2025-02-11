package br.com.api.code_and_shave_back.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.stereotype.Component;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo; // Importe a classe de usuário

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "chaveSuperSecreta";
    private static final long EXPIRATION_TIME = 86400000; // 24 horas

    private final Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

    // 🔹 Gera um token JWT contendo todas as informações do usuário (exceto senha)
    public String generateToken(UsuarioModelo usuario) {
        return JWT.create()
                .withSubject(usuario.getEMAIL()) // Identificador principal (email)
                .withClaim("id", usuario.getID()) // ID do usuário
                .withClaim("nome", usuario.getNOME()) // Nome
                .withClaim("telefone", usuario.getTELEFONE()) // Telefone
                .withClaim("tipo", usuario.getTIPO()) // Tipo (cliente/barbearia)
                .withClaim("ativo", usuario.getAtivo()) // Status ativo/inativo
                .withClaim("descricao", usuario.getDESCRICAO()) // Status ativo/inativo
                .withClaim("endereco", usuario.getENDERECO()) // Status ativo/inativo
                .withIssuedAt(new Date()) // Data de criação
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Expiração
                .sign(algorithm); // Assina o token
    }

    public String extractEmail(String token) {
        return JWT.decode(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getExpiresAt().after(new Date());
        } catch (JWTVerificationException e) {
            return false; // Token inválido ou expirado
        }
    }

    public DecodedJWT decodeToken(String token) {
        return JWT.decode(token);
    }
}
