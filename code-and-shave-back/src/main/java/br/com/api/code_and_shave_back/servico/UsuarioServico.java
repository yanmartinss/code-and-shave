package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.api.code_and_shave_back.modelo.RespostaModelo;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.repositorio.UsuarioRepositorio;

import java.util.Optional;

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
        if (um.getEMAIL().isEmpty()) {
            rm.setMensagem("O e-mail é obrigatório");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getNOME().isEmpty()) {
            rm.setMensagem("O nome de usuário é obrigatório");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getSENHA().isEmpty()) {
            rm.setMensagem("A senha é obrigatória");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getTELEFONE().isEmpty()) {
            rm.setMensagem("O número de telefone é obrigatório");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getTIPO().isEmpty()) {
            rm.setMensagem("O tipo de usuário é obrigatório");
            return new ResponseEntity<>(rm, HttpStatus.BAD_REQUEST);
        }

        if (ur.existsByEMAIL(um.getEMAIL())) {
            rm.setMensagem("E-mail já cadastrado");
            return new ResponseEntity<>(rm, HttpStatus.CONFLICT);
        }

        if (ur.existsByTELEFONE(um.getTELEFONE())) {
            rm.setMensagem("Telefone já cadastrado");
            return new ResponseEntity<>(rm, HttpStatus.CONFLICT);
        }

        if (acao.equals("cadastrar")) {
            um.setSENHA(encoder.encode(um.getSENHA()));
            return new ResponseEntity<>(ur.save(um), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(ur.save(um), HttpStatus.OK);
        }
    }

    public ResponseEntity<RespostaModelo> remover(long ID) {
        ur.deleteById(ID);
        rm.setMensagem("Conta de usuário excluída com sucesso");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }

    public ResponseEntity<?> login(String email, String senha) {
        Optional<UsuarioModelo> usuarioOpt = ur.findByEMAIL(email);

        if (usuarioOpt.isEmpty()) {
            rm.setMensagem("Usuário não encontrado");
            return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
        }

        UsuarioModelo usuario = usuarioOpt.get();

        if (!encoder.matches(senha, usuario.getSENHA())) {
            rm.setMensagem("Senha incorreta");
            return new ResponseEntity<>(rm, HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(usuario);
    }
}