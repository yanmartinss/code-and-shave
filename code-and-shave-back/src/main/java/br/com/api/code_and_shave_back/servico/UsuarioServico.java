package br.com.api.code_and_shave_back.servico;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.api.code_and_shave_back.modelo.RespostaModelo;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServico {
    @Autowired
    private UsuarioRepositorio ur;

    @Autowired
    private RespostaModelo rm;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Iterable<UsuarioModelo> listar() {
        return ur.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(UsuarioModelo um, String acao) {
        if (um.getAtivo() == null) {
            um.setAtivo(true); // Define o valor padrão caso não seja informado
        }
    
        if (um.getEMAIL() == null || um.getEMAIL().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "O e-mail é obrigatório"));
        }
        if (um.getNOME() == null || um.getNOME().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "O nome é obrigatório"));
        }
        if (um.getSENHA() == null || um.getSENHA().trim().isEmpty()) {
            UsuarioModelo usuarioExistente = ur.findByEMAIL(um.getEMAIL()).orElse(null);
            if (usuarioExistente != null) {
                um.setSENHA(usuarioExistente.getSENHA()); // Mantém a senha existente
            }
        } else {
            um.setSENHA(encoder.encode(um.getSENHA())); // Codifica a nova senha
        }
        if (um.getTELEFONE() == null || um.getTELEFONE().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "O telefone é obrigatório"));
        }
        if (um.getTIPO() == null || um.getTIPO().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "O tipo de usuário é obrigatório"));
        }
    
        try {
            if (acao.equals("cadastrar")) {
                if (ur.existsByEMAIL(um.getEMAIL())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erro", "E-mail já cadastrado"));
                }
                if (ur.existsByTELEFONE(um.getTELEFONE())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erro", "Telefone já cadastrado"));
                }
                um.setSENHA(encoder.encode(um.getSENHA()));  // Só define a senha se estiver sendo cadastrada
                return ResponseEntity.status(HttpStatus.CREATED).body(ur.save(um));
            } else {
                // Se for uma alteração, verifica o usuário existente
                Optional<UsuarioModelo> usuarioExistenteOptional = ur.findByEMAIL(um.getEMAIL());
                if (usuarioExistenteOptional.isPresent()) {
                    UsuarioModelo usuarioExistente = usuarioExistenteOptional.get();
                    um.setSENHA(usuarioExistente.getSENHA()); // Mantém a senha existente
                }
                return ResponseEntity.ok(ur.save(um));  // Salva as alterações no banco de dados
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("erro", "Erro no servidor: " + e.getMessage()));
        }
    }     

    public ResponseEntity<RespostaModelo> remover(long ID) {
        ur.deleteById(ID);
        rm.setMensagem("Conta de usuário excluída com sucesso");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }
}