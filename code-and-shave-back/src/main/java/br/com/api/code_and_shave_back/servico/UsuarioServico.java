package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

   // private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    // Método para listar todos os usuários
    public Iterable<UsuarioModelo> listar() {
        return ur.findAll();
    }

    // Método para cadastrar ou alterar usuários
    public ResponseEntity<?> cadastrarAlterar(UsuarioModelo um, String acao) {

        // Pode ser adicionado novas verificações pra esses campos
        if (um.getEMAIL().equals("")) {
            rm.setMensagem("O e-mail é obrigatório");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getNOME().equals("")) {
            rm.setMensagem("O nome de usuário é obrigatório");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getSENHA().equals("")) {
            rm.setMensagem("A senha é obrigatória");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getTELEFONE().equals("")) {
            rm.setMensagem("O número de telefone é obrigatório");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else if (um.getTIPO().equals("")) {
            rm.setMensagem("O tipo de usuário é obrigatório");
            return new ResponseEntity<RespostaModelo>(rm, HttpStatus.BAD_REQUEST);
        } else {
            if (acao.equals("cadastrar")) {
                return new ResponseEntity<UsuarioModelo>(ur.save(um), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<UsuarioModelo>(ur.save(um), HttpStatus.OK);
            }
        }

    }

    // Método para excluir a conta de usuário
    public ResponseEntity<RespostaModelo> remover(long ID) {
        ur.deleteById(ID);

        rm.setMensagem("Conta de usuário excluída com sucesso");
        return new ResponseEntity<RespostaModelo>(rm, HttpStatus.OK);
    }

    // Método para Login
// public ResponseEntity<?> login(String email, String senha) {
//     Optional<UsuarioModelo> usuarioOpt = ur.findByEMAIL(email);

//     if (usuarioOpt.isEmpty()) {
//         rm.setMensagem("Usuário não encontrado");
//         return new ResponseEntity<>(rm, HttpStatus.NOT_FOUND);
//     }

//     UsuarioModelo usuario = usuarioOpt.get();

//     if (!encoder.matches(senha, usuario.getSENHA())) {
//         rm.setMensagem("Senha incorreta");
//         return new ResponseEntity<>(rm, HttpStatus.UNAUTHORIZED);
//     }

//     return ResponseEntity.ok(usuario);
// }

}