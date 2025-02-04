package br.com.api.code_and_shave_back.servico;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class PasswordUtil {
    // Método para gerar o hash da senha
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    // Método para verificar se a senha corresponde ao hash
    public static boolean checkPassword(String password, String hashed) {
        return BCrypt.checkpw(password, hashed);
    }
}

