package br.com.api.code_and_shave_back.repositorio;

import br.com.api.code_and_shave_back.modelo.ServicoModelo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicoRepositorio extends CrudRepository<ServicoModelo, Long> {
    List<ServicoModelo> findByNome(String nome); // Buscar serviços pelo nome
}
