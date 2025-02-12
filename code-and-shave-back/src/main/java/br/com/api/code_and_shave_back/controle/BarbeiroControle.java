package br.com.api.code_and_shave_back.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.api.code_and_shave_back.modelo.BarbeiroModelo;
import br.com.api.code_and_shave_back.servico.BarbeiroServico;

@RestController
@RequestMapping("/barbeiros")
@CrossOrigin(origins = "*")
public class BarbeiroControle {

    @Autowired
    private BarbeiroServico barbeiroServico;

    
    @GetMapping("/listar")
    public ResponseEntity<?> listarTodos() {
        return barbeiroServico.listarTodos();
    }

    
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarOuAtualizar(@RequestBody BarbeiroModelo barbeiro) {
        return barbeiroServico.cadastrarOuAtualizar(barbeiro);
    }

    
    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> remover(@PathVariable Long id) {
        return barbeiroServico.removerBarbeiro(id);
    }

    
    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody BarbeiroModelo barbeiro) {
        return barbeiroServico.atualizarBarbeiro(id, barbeiro);
    }

}
