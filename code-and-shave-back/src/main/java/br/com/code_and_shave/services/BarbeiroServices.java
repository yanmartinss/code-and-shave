package br.com.code_and_shave.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.code_and_shave.model.Barbeiro;
import br.com.code_and_shave.repositories.BarbeiroRepository;

@Service
public class BarbeiroServices {
    @Autowired
    private BarbeiroRepository barbeiroRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Barbeiro cadastrarBarbeiro(Barbeiro barbeiro){
        if (barbeiroRepository.findByEmail(barbeiro.getEmail()) != null) {
            throw new RuntimeException("E-mail já cadastrado!");
        }
        barbeiro.setSenha(passwordEncoder.encode(barbeiro.getSenha()));

        return barbeiroRepository.save(barbeiro);
    }

}
