package br.com.api.code_and_shave_back.controle;

import br.com.api.code_and_shave_back.modelo.AgendamentoModeloCliente;
import br.com.api.code_and_shave_back.servico.AgendamentoServicoCliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/agendamentos-cliente")
public class AgendamentoControleCliente {
    
    private final AgendamentoServicoCliente agendamentoClienteServico;
    
    @Autowired
    public AgendamentoControleCliente(AgendamentoServicoCliente agendamentoClienteServico) {
        this.agendamentoClienteServico = agendamentoClienteServico;
    }
    
    @GetMapping("/horarios-disponiveis")
    public ResponseEntity<List<AgendamentoModeloCliente>> listarHorarios(@RequestParam String date) {
        LocalDate data = LocalDate.parse(date);
        return ResponseEntity.ok(agendamentoClienteServico.listarPorData(data));
    }
    
    @PostMapping("/agendar")
    public ResponseEntity<AgendamentoModeloCliente> agendar(@RequestBody AgendamentoModeloCliente agendamento) {
        return ResponseEntity.ok(agendamentoClienteServico.agendar(agendamento));
    }
}
