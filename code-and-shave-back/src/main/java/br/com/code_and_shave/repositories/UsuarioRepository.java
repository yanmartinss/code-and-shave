package br.com.code_and_shave.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.code_and_shave.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
