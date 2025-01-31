package br.com.api.code_and_shave_back.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.code_and_shave_back.modelo.RespostaModelo;
import br.com.api.code_and_shave_back.modelo.UsuarioModelo;
import br.com.api.code_and_shave_back.servico.UsuarioServico;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioControle {

    @Autowired
    private UsuarioServico us;

    // Rotas para executar as ações
    @DeleteMapping("/remover/{ID}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long ID) {
        return us.remover(ID);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody UsuarioModelo um) {
        return us.cadastrarAlterar(um, "alterar");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody UsuarioModelo um) {
        return us.cadastrarAlterar(um, "cadastrar");
    }

    @GetMapping("/listar")
    public Iterable<UsuarioModelo> listar() {
        return us.listar();
    }

    @GetMapping("/")
    public String rota() {
        return "API de usuários funcionando";
    }
}
