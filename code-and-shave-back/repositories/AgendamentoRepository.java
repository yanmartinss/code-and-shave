package br.com.code_and_shave.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.code_and_shave.model.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByClientesId (Long clienteId);
    List<Agendamento> findByBarbeiroId (Long barbeiroId);
    

}
