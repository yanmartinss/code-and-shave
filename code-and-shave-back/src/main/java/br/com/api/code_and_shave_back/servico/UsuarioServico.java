package br.com.api.code_and_shave_back.servico;

import java.util.Map;

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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "A senha é obrigatória"));
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
                um.setSENHA(encoder.encode(um.getSENHA()));
                return ResponseEntity.status(HttpStatus.CREATED).body(ur.save(um));
            } else {
                return ResponseEntity.ok(ur.save(um));
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