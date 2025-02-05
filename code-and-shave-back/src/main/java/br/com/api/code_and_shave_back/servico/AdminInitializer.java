package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.repositorio.UsuarioRepositorio;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Override
    public void run(String... args) throws Exception {
        if (usuarioRepositorio.findByTIPO("barbearia").isEmpty()) {
            UsuarioModelo admin = new UsuarioModelo();
            admin.setNOME("Barbearia");
            admin.setEMAIL("admin@codeandshave.com");
            admin.setTELEFONE("0000000000");
            admin.setSENHA(PasswordUtil.hashPassword("admin123")); // Criptografia da senha
            admin.setTIPO("barbearia");

            usuarioRepositorio.save(admin);
            System.out.println("✅ Administrador criado com sucesso!");
        } else {
            System.out.println("✅ Administrador já existente.");
        }
    }
}
