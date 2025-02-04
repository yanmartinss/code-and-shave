package br.com.api.code_and_shave_back.repositorio;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.code_and_shave_back.modelo.UsuarioModelo;

@Repository
public interface UsuarioRepositorio extends CrudRepository<UsuarioModelo, Long>{
    List<UsuarioModelo> findByTIPO(String tipo);
    Optional<UsuarioModelo> findByEMAIL(String email);
}   