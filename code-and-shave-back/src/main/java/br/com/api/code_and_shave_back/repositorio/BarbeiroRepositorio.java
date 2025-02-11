package br.com.api.code_and_shave_back.repositorio;

import br.com.api.code_and_shave_back.modelo.BarbeiroModelo;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarbeiroRepositorio extends CrudRepository<BarbeiroModelo, Long> {

    Optional<BarbeiroModelo> findByEmail(String email);

    Optional<BarbeiroModelo> findByPhone(String phone);

    boolean existsByEmail(String email); // Para verificar se o e-mail já está cadastrado
}
