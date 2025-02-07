package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Import do BCrypt
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

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(); // Inicialização do BCrypt

    // Método para listar todos os usuários
    public Iterable<UsuarioModelo> listar() {
        return ur.findAll();
    }

    // Método para cadastrar ou alterar usuários
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
        } else {
            // Criptografar a senha apenas no cadastro
            if (acao.equals("cadastrar")) {
                um.setSENHA(encoder.encode(um.getSENHA())); // Criptografa a senha
                return new ResponseEntity<>(ur.save(um), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(ur.save(um), HttpStatus.OK);
            }
        }
    }

    // Método para excluir a conta de usuário
    public ResponseEntity<RespostaModelo> remover(long ID) {
        ur.deleteById(ID);
        rm.setMensagem("Conta de usuário excluída com sucesso");
        return new ResponseEntity<>(rm, HttpStatus.OK);
    }
}