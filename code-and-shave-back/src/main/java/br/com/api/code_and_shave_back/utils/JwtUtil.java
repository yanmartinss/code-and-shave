package br.com.api.code_and_shave_back.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.stereotype.Component;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "chaveSuperSecreta"; // Chave secreta para assinar o token
    private static final long EXPIRATION_TIME = 86400000; // 24 horas em milissegundos

    private final Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

    /**
     * Gera um token JWT contendo informações do usuário.
     *
     * @param usuario O objeto UsuarioModelo contendo os dados do usuário.
     * @return Token JWT assinado.
     * @throws IllegalArgumentException Se os dados do usuário forem inválidos.
     */
    public String generateToken(UsuarioModelo usuario) {
        if (usuario == null || usuario.getEMAIL() == null || usuario.getEMAIL().trim().isEmpty()) {
            throw new IllegalArgumentException("Dados do usuário inválidos para gerar o token.");
        }

        return JWT.create()
                .withSubject(usuario.getEMAIL()) // Identificador principal (email)
                .withClaim("id", usuario.getID()) // ID do usuário
                .withClaim("nome", usuario.getNOME()) // Nome
                .withClaim("telefone", usuario.getTELEFONE()) // Telefone
                .withClaim("tipo", usuario.getTIPO()) // Tipo (cliente/barbearia)
                .withClaim("ativo", usuario.getAtivo()) // Status ativo/inativo
                .withClaim("descricao", usuario.getDESCRICAO()) // Descrição
                .withClaim("endereco", usuario.getENDERECO()) // Endereço
                .withIssuedAt(new Date()) // Data de criação (iat)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Data de expiração (exp)
                .sign(algorithm); // Assina o token
    }

    /**
     * Extrai o email do token JWT.
     *
     * @param token O token JWT.
     * @return O email contido no token.
     * @throws JWTVerificationException Se o token for inválido.
     */
    public String extractEmail(String token) {
        return JWT.decode(token).getSubject();
    }

    /**
     * Valida o token JWT.
     *
     * @param token O token JWT.
     * @return true se o token for válido e não estiver expirado, false caso contrário.
     */
    public boolean validateToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getExpiresAt().after(new Date()); // Verifica se o token não expirou
        } catch (JWTVerificationException e) {
            return false; // Token inválido ou expirado
        }
    }

    /**
     * Decodifica o token JWT.
     *
     * @param token O token JWT.
     * @return Objeto DecodedJWT contendo as informações do token.
     * @throws JWTVerificationException Se o token for inválido.
     */
    public DecodedJWT decodeToken(String token) {
        return JWT.decode(token);
    }
}