package br.com.code_and_shave.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.code_and_shave.model.Cliente;
import br.com.code_and_shave.repositories.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Cliente cadastrarCliente (Cliente cliente){
        if (clienteRepository.findByEmail(cliente.getEmail()) != null){
            throw new RuntimeException("E-mail já cadastrado! ");
        }
        cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));

        return clienteRepository.save(cliente);
    }

}
