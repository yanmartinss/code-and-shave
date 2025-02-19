package br.com.api.code_and_shave_back.servico;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.api.code_and_shave_back.modelo.AlterarSenhaRequest;
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
            um.setAtivo(true);
        }
    
        if (um.getEMAIL() == null || um.getEMAIL().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "O e-mail é obrigatório"));
        }
        if (um.getNOME() == null || um.getNOME().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "O nome é obrigatório"));
        }
        if (um.getTELEFONE() == null || um.getTELEFONE().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "O telefone é obrigatório"));
        }
        if (um.getTIPO() == null || um.getTIPO().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "O tipo de usuário é obrigatório"));
        }
    
        try {
            if ("cadastrar".equals(acao)) {
                if (ur.existsByEMAIL(um.getEMAIL())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erro", "E-mail já cadastrado"));
                }
                if (ur.existsByTELEFONE(um.getTELEFONE())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erro", "Telefone já cadastrado"));
                }
    
                if (um.getSENHA() != null && !um.getSENHA().trim().isEmpty()) {
                    um.setSENHA(encoder.encode(um.getSENHA()));
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "Senha é obrigatória para cadastro"));
                }
    
                return ResponseEntity.status(HttpStatus.CREATED).body(ur.save(um));
    
            } else {
                Optional<UsuarioModelo> usuarioExistenteOptional = ur.findById(um.getID());
                if (!usuarioExistenteOptional.isPresent()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erro", "Usuário não encontrado"));
                }
    
                UsuarioModelo usuarioExistente = usuarioExistenteOptional.get();
    
                if (!usuarioExistente.getEMAIL().equals(um.getEMAIL()) && ur.existsByEMAIL(um.getEMAIL())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erro", "E-mail já cadastrado"));
                }
    
                usuarioExistente.setNOME(um.getNOME());
                usuarioExistente.setEMAIL(um.getEMAIL());
                usuarioExistente.setTELEFONE(um.getTELEFONE());
    
                if ("barbearia".equalsIgnoreCase(um.getTIPO())) {
                    usuarioExistente.setENDERECO(um.getENDERECO());
                    usuarioExistente.setDESCRICAO(um.getDESCRICAO());
                }
    
                usuarioExistente.setTIPO(um.getTIPO());
                usuarioExistente.setAtivo(um.getAtivo());
    
                if (um.getSENHA() != null && !um.getSENHA().trim().isEmpty()) {
                    usuarioExistente.setSENHA(encoder.encode(um.getSENHA()));
                }
    
                return ResponseEntity.ok(ur.save(usuarioExistente));
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

    public ResponseEntity<?> alterarSenha(AlterarSenhaRequest request) {
        try {
            Optional<UsuarioModelo> usuarioOptional = ur.findByEMAIL(request.getEmail());
            if (!usuarioOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erro", "Usuário não encontrado"));
            }

            UsuarioModelo usuario = usuarioOptional.get();

            if (!encoder.matches(request.getSenhaAtual(), usuario.getSENHA())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("erro", "Senha atual incorreta"));
            }

            usuario.setSENHA(encoder.encode(request.getNovaSenha()));
            ur.save(usuario);

            return ResponseEntity.ok(Map.of("mensagem", "Senha alterada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("erro", "Erro ao alterar senha: " + e.getMessage()));
        }
    }
}
