package br.com.api.code_and_shave_back.servico;

import br.com.api.code_and_shave_back.modelo.AgendamentoModelo;
import br.com.api.code_and_shave_back.repositorio.AgendamentoRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AgendamentoServico {

    @Autowired
    private AgendamentoRepositorio agendamentoRepository;

    public List<AgendamentoModelo> listarAgendamentosPorData(LocalDate data) {
        return agendamentoRepository.findByData(data);
    }

    public List<AgendamentoModelo> listarTodosAgendamentos() {
        return agendamentoRepository.findAll();
    }

    public AgendamentoModelo salvarAgendamento(AgendamentoModelo agendamento) {
        return agendamentoRepository.save(agendamento);
    }
}