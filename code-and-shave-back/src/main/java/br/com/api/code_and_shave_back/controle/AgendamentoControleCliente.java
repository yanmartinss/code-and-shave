package br.com.api.code_and_shave_back.controle;

import br.com.api.code_and_shave_back.modelo.AgendamentoModeloCliente;
import br.com.api.code_and_shave_back.repositorio.AgendamentoRepositorioCliente;
import br.com.api.code_and_shave_back.servico.AgendamentoServicoCliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class AgendamentoControleCliente {

    @Autowired
    private AgendamentoServicoCliente agendamentoServicoCliente;

    @Autowired
    private AgendamentoRepositorioCliente agendamentoRepositorioCliente;

    // Endpoint para listar horários disponíveis
    @GetMapping("/horarios-disponiveis")
    public ResponseEntity<List<String>> listarHorariosDisponiveis(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<String> horarios = agendamentoServicoCliente.listarHorariosDisponiveis(date);
        return ResponseEntity.ok(horarios);
    }

    // Endpoint para realizar um agendamento
    @PostMapping("/agendar")
    public ResponseEntity<?> agendar(@RequestBody AgendamentoModeloCliente agendamento) {
        System.out.println("Recebendo agendamento: ClienteID = " + (agendamento.getCliente() != null ? agendamento.getCliente().getID() : "null"));
        System.out.println("Recebendo agendamento: BarbeiroID = " + (agendamento.getBarbeiro() != null ? agendamento.getBarbeiro().getId() : "null"));
        System.out.println("Recebendo agendamento: ServicoID = " + (agendamento.getServico() != null ? agendamento.getServico().getId() : "null"));

        try {
            return ResponseEntity.ok(agendamentoServicoCliente.agendar(agendamento));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao salvar agendamento: " + e.getMessage());
        }
    }

    @GetMapping("/agendamentos")
    public ResponseEntity<List<AgendamentoModeloCliente>> listarAgendamentosPorData(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        List<AgendamentoModeloCliente> agendamentos = agendamentoServicoCliente.listarAgendamentosPorData(data);
        return ResponseEntity.ok(agendamentos);
    }

    @GetMapping("/agendamentos-cliente/{clienteId}")
    public ResponseEntity<List<AgendamentoModeloCliente>> listarAgendamentosPorCliente(@PathVariable Long clienteId) {
        List<AgendamentoModeloCliente> agendamentos = agendamentoRepositorioCliente.findByClienteID(clienteId);
        return ResponseEntity.ok(agendamentos);
    }

    @DeleteMapping("/agendamentos/{id}")
    public ResponseEntity<?> cancelarAgendamento(@PathVariable Long id) {
        boolean removed = agendamentoServicoCliente.cancelarAgendamento(id);
        if (removed) {
            return ResponseEntity.ok().body("Agendamento cancelado com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado.");
        }
    }

}