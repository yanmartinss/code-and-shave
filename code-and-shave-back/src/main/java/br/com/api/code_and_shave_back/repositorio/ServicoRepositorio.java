package br.com.api.code_and_shave_back.repositorio;

import br.com.api.code_and_shave_back.modelo.ServicoModelo;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicoRepositorio extends CrudRepository<ServicoModelo, Long> {
    List<ServicoModelo> findByNome(String nome); 
    
    @Modifying
    @Query(value = "DELETE FROM barbeiro_servico WHERE servico_id = :id", nativeQuery = true)
    void removerVinculosComBarbeiros(@Param("id") Long id);

}
