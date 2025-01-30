package br.com.code_and_shave.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.code_and_shave.model.Barbeiro;
import br.com.code_and_shave.model.Cliente;
import br.com.code_and_shave.repositories.BarbeiroRepository;
import br.com.code_and_shave.repositories.ClienteRepository;
import br.com.code_and_shave.utils.JwtUtil;

@Service
public class LoginService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private BarbeiroRepository barbeiroRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String autenticar(String email, String senha){
        //Verificar se um usario é um cliente
        Cliente cliente = clienteRepository.findByEmail(email);
        if (cliente != null && passwordEncoder.matches(senha,cliente.getSenha())) {
            return JwtUtil.generateToken(cliente.getEmail(),"CLIENTE");
        }
        //Verificar se o usuário é um barbeiro
        Barbeiro barbeiro = barbeiroRepository.findByEmail(email);
        if(barbeiro != null && passwordEncoder.matches(senha,barbeiro.getSenha())){
            return JwtUtil.generateToken(barbeiro.getEmail(),"BARBEIRO");
        }

        throw new RuntimeException("Credenciais inválidas!");
    }

}
