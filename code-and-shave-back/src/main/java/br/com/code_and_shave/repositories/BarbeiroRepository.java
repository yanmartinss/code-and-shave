package br.com.code_and_shave.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.code_and_shave.model.Barbeiro;

public interface BarbeiroRepository extends JpaRepository<Barbeiro, Long> {

    Barbeiro findByEmail( String email);
    
}
