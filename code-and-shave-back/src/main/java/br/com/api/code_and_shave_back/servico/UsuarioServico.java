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
        // Define o valor padrão para 'ativo' caso não seja informado
        if (um.getAtivo() == null) {
            um.setAtivo(true); 
        }
    
        // Verificações dos campos obrigatórios
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
            // Verificação de se a senha foi fornecida
            if (um.getSENHA() == null || um.getSENHA().trim().isEmpty()) {
                // Se não for fornecida, mantém a senha existente
                UsuarioModelo usuarioExistente = ur.findByEMAIL(um.getEMAIL()).orElse(null);
                if (usuarioExistente != null) {
                    um.setSENHA(usuarioExistente.getSENHA()); // Mantém a senha existente
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("erro", "Senha é obrigatória para cadastro"));
                }
            } else {
                // Se a senha for fornecida, codifique a nova senha
                um.setSENHA(encoder.encode(um.getSENHA()));
            }
    
            // Caso seja uma tentativa de cadastro, verificamos se o e-mail já está registrado
            if (acao.equals("cadastrar")) {
                if (ur.existsByEMAIL(um.getEMAIL())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erro", "E-mail já cadastrado"));
                }
                if (ur.existsByTELEFONE(um.getTELEFONE())) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("erro", "Telefone já cadastrado"));
                }
                // Cadastro do usuário
                return ResponseEntity.status(HttpStatus.CREATED).body(ur.save(um));
    
            } else {
                // Se for uma alteração, buscamos o usuário existente e atualizamos os dados
                Optional<UsuarioModelo> usuarioExistenteOptional = ur.findByEMAIL(um.getEMAIL());
                if (usuarioExistenteOptional.isPresent()) {
                    // Se o usuário existir, mantém a senha existente
                    UsuarioModelo usuarioExistente = usuarioExistenteOptional.get();
                    um.setID(usuarioExistente.getID());  // Mantém o mesmo ID
                }
                // Salva as alterações no banco de dados
                return ResponseEntity.ok(ur.save(um));
            }
    
        } catch (Exception e) {
            // Se ocorrer algum erro no processo, retorna um erro genérico
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
            // Busca o usuário pelo email
            Optional<UsuarioModelo> usuarioOptional = ur.findByEMAIL(request.getEmail());
            if (!usuarioOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("erro", "Usuário não encontrado"));
            }

            UsuarioModelo usuario = usuarioOptional.get();

            // Verifica se a senha atual está correta
            if (!encoder.matches(request.getSenhaAtual(), usuario.getSENHA())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("erro", "Senha atual incorreta"));
            }

            // Criptografa a nova senha
            usuario.setSENHA(encoder.encode(request.getNovaSenha()));

            // Salva o usuário com a nova senha
            ur.save(usuario);

            return ResponseEntity.ok(Map.of("mensagem", "Senha alterada com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("erro", "Erro ao alterar senha: " + e.getMessage()));
        }
    }
}