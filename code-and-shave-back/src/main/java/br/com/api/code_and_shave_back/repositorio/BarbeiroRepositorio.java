package br.com.api.code_and_shave_back.repositorio;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import br.com.api.code_and_shave_back.modelo.BarbeiroModelo;

@Repository
public interface BarbeiroRepositorio extends CrudRepository<BarbeiroModelo, Long> {
    
    List<BarbeiroModelo> findByEmail(String email); // 🔹 Buscar lista de barbeiros com o mesmo email

    List<BarbeiroModelo> findByTelefone(String telefone); // 🔹 Buscar lista de barbeiros com o mesmo telefone

    Iterable<BarbeiroModelo> findByEspecialidade(String especialidade); // 🔹 Buscar barbeiros por especialidade
}
