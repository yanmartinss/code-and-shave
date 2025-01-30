package br.com.code_and_shave.utils;

import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {

    private static final String SECRET= "MinhaChaveSecretaSuperSegura123!"; // Substituir por uma chave forte
    private static final SecretKey SECRET_KEY = new SecretKeySpec(Base64.getEncoder().encode(SECRET.getBytes()), SignatureAlgorithm.HS256.getJcaName());
    
    private static final long EXPIRATION_TIME = 86400000; // 24 horas

    //Metodo para gerar Token JWT
    public static String generateToken(String email, String role){
        return Jwts.builder()
        .setSubject(email)
        .claim("role", role)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
        .signWith(SECRET_KEY)
        .compact();
    }

    //Metodod para obter o email (subject) do token
    public static String getSubject( String token){
        return Jwts.parserBuilder()
        .setSigningKey(SECRET_KEY)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
    }

    //Metodo para validar o token
    public static boolean isValiddToken( String token){
        try{
            Claims claims = Jwts.parserBuilder()
            .setSigningKey(SECRET_KEY)
            .build()
            .parseClaimsJws(token)
            .getBody();

            return claims.getExpiration().after(new Date());
        } catch (Exception e){
            return false; //Se ocorrer qulaquer erro, o token não é valido
        }
    }

}
