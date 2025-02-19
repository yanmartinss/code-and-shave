package br.com.api.code_and_shave_back.repositorio;

import br.com.api.code_and_shave_back.modelo.AgendamentoModeloCliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AgendamentoRepositorioCliente extends JpaRepository<AgendamentoModeloCliente, Long> {

    List<AgendamentoModeloCliente> findByData(LocalDate data);

    boolean existsByDataAndHorario(LocalDate data, LocalTime horario);

    List<AgendamentoModeloCliente> findByClienteID(Long clienteId);

}