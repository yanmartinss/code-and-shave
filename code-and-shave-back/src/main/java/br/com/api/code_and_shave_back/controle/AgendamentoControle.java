package br.com.api.code_and_shave_back.controle;

import br.com.api.code_and_shave_back.modelo.AgendamentoModelo;
import br.com.api.code_and_shave_back.servico.AgendamentoServico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/agendamentos-barbearia")
public class AgendamentoControle {

    @Autowired
    private AgendamentoServico agendamentoService;

    @GetMapping
    public List<AgendamentoModelo> listarAgendamentos() {
        return agendamentoService.listarTodosAgendamentos();
    }

    @GetMapping("/{data}")
    public List<AgendamentoModelo> listarAgendamentosPorData(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return agendamentoService.listarAgendamentosPorData(data);
    }

    @PostMapping
    public AgendamentoModelo criarAgendamento(@RequestBody AgendamentoModelo agendamento) {
        return agendamentoService.salvarAgendamento(agendamento);
    }
}