package br.com.api.code_and_shave_back.servico;

import br.com.api.code_and_shave_back.modelo.AgendamentoModeloCliente;
import br.com.api.code_and_shave_back.repositorio.AgendamentoRepositorioCliente;
import br.com.api.code_and_shave_back.repositorio.UsuarioRepositorio;
import br.com.api.code_and_shave_back.repositorio.BarbeiroRepositorio;
import br.com.api.code_and_shave_back.repositorio.ServicoRepositorio;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.modelo.BarbeiroModelo;
import br.com.api.code_and_shave_back.modelo.ServicoModelo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoServicoCliente {

    @Autowired
    private AgendamentoRepositorioCliente agendamentoRepositorioCliente;
    
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    
    @Autowired
    private BarbeiroRepositorio barbeiroRepositorio;
    
    @Autowired
    private ServicoRepositorio servicoRepositorio;

    // Lista horários disponíveis para uma data específica
    public List<String> listarHorariosDisponiveis(LocalDate data) {
        List<String> todosHorarios = List.of("09:00", "10:00", "11:00", "14:00", "15:00", "16:00"); // Horários fixos
        List<String> horariosDisponiveis = new ArrayList<>();

        for (String horario : todosHorarios) {
            LocalTime time = LocalTime.parse(horario);
            if (!agendamentoRepositorioCliente.existsByDataAndHorario(data, time)) {
                horariosDisponiveis.add(horario);
            }
        }
        return horariosDisponiveis;
    }

    // Realiza um agendamento verificando se os IDs existem no banco antes de salvar
    public AgendamentoModeloCliente agendar(AgendamentoModeloCliente agendamento) {
        // Verifica se o horário já está ocupado
        if (agendamentoRepositorioCliente.existsByDataAndHorario(agendamento.getData(), agendamento.getHorario())) {
            throw new RuntimeException("Horário já ocupado.");
        }
        
        // Valida se o cliente existe no banco
        Optional<UsuarioModelo> cliente = usuarioRepositorio.findById(agendamento.getCliente().getID());
        if (cliente.isEmpty()) {
            throw new RuntimeException("Cliente não encontrado.");
        }
        
        // Valida se o barbeiro existe no banco
        Optional<BarbeiroModelo> barbeiro = barbeiroRepositorio.findById(agendamento.getBarbeiro().getId());
        if (barbeiro.isEmpty()) {
            throw new RuntimeException("Barbeiro não encontrado.");
        }

        // Valida se o serviço existe no banco
        Optional<ServicoModelo> servico = servicoRepositorio.findById(agendamento.getServico().getId());
        if (servico.isEmpty()) {
            throw new RuntimeException("Serviço não encontrado.");
        }

        // Define os objetos verificados antes de salvar
        agendamento.setCliente(cliente.get());
        agendamento.setBarbeiro(barbeiro.get());
        agendamento.setServico(servico.get());

        return agendamentoRepositorioCliente.save(agendamento);
    }

    public List<AgendamentoModeloCliente> listarAgendamentosPorData(LocalDate data) {
        return agendamentoRepositorioCliente.findByData(data);
    }

    public boolean cancelarAgendamento(Long id) {
        if (agendamentoRepositorioCliente.existsById(id)) {
            agendamentoRepositorioCliente.deleteById(id);
            return true;
        }
        return false;
    }
}
