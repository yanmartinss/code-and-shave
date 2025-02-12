package br.com.api.code_and_shave_back.repositorio;

import br.com.api.code_and_shave_back.modelo.AgendamentoModelo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AgendamentoRepositorio extends JpaRepository<AgendamentoModelo, Long> {
    List<AgendamentoModelo> findByData(LocalDate data);
}