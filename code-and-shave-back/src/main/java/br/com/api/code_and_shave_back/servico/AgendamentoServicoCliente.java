package br.com.api.code_and_shave_back.servico;

import br.com.api.code_and_shave_back.modelo.AgendamentoModeloCliente;
import br.com.api.code_and_shave_back.repositorio.AgendamentoRepositorioCliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AgendamentoServicoCliente {
    
    private final AgendamentoRepositorioCliente agendamentoRepositorioCliente;
    
    @Autowired
    public AgendamentoServicoCliente(AgendamentoRepositorioCliente agendamentoRepositorioCliente) {
        this.agendamentoRepositorioCliente = agendamentoRepositorioCliente;
    }
    
    public List<AgendamentoModeloCliente> listarPorData(LocalDate data) {
        return agendamentoRepositorioCliente.findByData(data)
                .stream()
                .map(agendamento -> new AgendamentoModeloCliente(
                    agendamento.getId(),
                    agendamento.getData(),
                    agendamento.getHorario(),
                    agendamento.getCliente(),
                    agendamento.getBarbeiro(),
                    agendamento.getServico()
                ))
                .collect(Collectors.toList());
    }

    public AgendamentoModeloCliente agendar(AgendamentoModeloCliente agendamentoCliente) {
        return agendamentoRepositorioCliente.save(agendamentoCliente);
    }
}
