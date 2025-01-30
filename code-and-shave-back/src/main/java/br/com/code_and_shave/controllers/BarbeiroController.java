package br.com.code_and_shave.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.code_and_shave.model.Barbeiro;
import br.com.code_and_shave.repositories.BarbeiroRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/barbeiros")
public class BarbeiroController {

    @Autowired
    private BarbeiroRepository barbeiroRepository;

    @PostMapping
    public ResponseEntity<Barbeiro> criarBarbeiro(@Valid@RequestBody Barbeiro barbeiro){
        Barbeiro novoBarbeiro = barbeiroRepository.save(barbeiro);
        return ResponseEntity.ok(novoBarbeiro);
    }

    @GetMapping
    public List<Barbeiro> listarBarbeiros(){
        return barbeiroRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barbeiro> buscarBarbeiroPorId(@PathVariable Long id){
        return barbeiroRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
        
    }

}
