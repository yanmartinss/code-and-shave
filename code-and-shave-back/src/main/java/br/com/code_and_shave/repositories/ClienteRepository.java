package br.com.code_and_shave.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.code_and_shave.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Cliente findByEmail( String email);

}
