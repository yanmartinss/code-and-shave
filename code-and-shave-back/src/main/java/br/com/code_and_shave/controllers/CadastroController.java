package br.com.code_and_shave.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.code_and_shave.model.Barbeiro;
import br.com.code_and_shave.model.Cliente;
import br.com.code_and_shave.services.BarbeiroServices;
import br.com.code_and_shave.services.ClienteService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/cadastro")
public class CadastroController {
    @Autowired
    private ClienteService clienteService;

    @Autowired
    private BarbeiroServices barbeiroService;

    @PostMapping("/cliente")
    public ResponseEntity<Cliente> cadastarCliente(@Valid @RequestBody Cliente cliente){
        try{
            Cliente novoCliente = clienteService.cadastrarCliente(cliente);
            return ResponseEntity.ok(novoCliente);
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/barbeiro")
    public ResponseEntity<Barbeiro> cadastrarBarbeiro(@Valid @RequestBody Barbeiro barbeiro){
        try{
            Barbeiro novoBarbeiro = barbeiroService.cadastrarBarbeiro(barbeiro);
            return ResponseEntity.ok(novoBarbeiro);
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(null);
        }
    }




}
