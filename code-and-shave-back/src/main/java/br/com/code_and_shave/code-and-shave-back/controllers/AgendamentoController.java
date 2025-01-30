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

import br.com.code_and_shave.model.Agendamento;
import br.com.code_and_shave.repositories.AgendamentoRepository;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @PostMapping
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody Agendamento agendamento){
        Agendamento novoAgendamento = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(novoAgendamento);
    }

    @GetMapping
    public List<Agendamento> listarAgendamentos(){
        return agendamentoRepository.findAll();

    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarAgendamentosPorId(@PathVariable Long id){
        return agendamentoRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

}
