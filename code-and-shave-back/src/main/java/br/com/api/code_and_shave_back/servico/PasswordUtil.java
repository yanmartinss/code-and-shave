package br.com.api.code_and_shave_back.servico;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class PasswordUtil {
    
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    
    public static boolean checkPassword(String password, String hashed) {
        return BCrypt.checkpw(password, hashed);
    }
}

