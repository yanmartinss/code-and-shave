package br.com.api.code_and_shave_back.controle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.api.code_and_shave_back.modelo.ServicoModelo;
import br.com.api.code_and_shave_back.servico.ServicoServico;

@RestController
@RequestMapping("/servicos")
@CrossOrigin(origins = "http://localhost:3000") 
public class ServicoControle {

    @Autowired
    private ServicoServico servicoServico;

   
    @GetMapping("/listar")
    public ResponseEntity<?> listarTodos() {
        return servicoServico.listarTodos();
    }

    @GetMapping("/listar/{barbeiroId}")
    public ResponseEntity<List<ServicoModelo>> listarServicosPorBarbeiro(@PathVariable Long barbeiroId) {
        List<ServicoModelo> servicos = servicoServico.listarServicosPorBarbeiro(barbeiroId);
        return ResponseEntity.ok(servicos);
    }

    //  Cadastrar ou atualizar serviço
    @PostMapping("/salvar")
    public ResponseEntity<?> cadastrarOuAtualizar(@RequestBody ServicoModelo servico) {
        return servicoServico.cadastrarOuAtualizar(servico);
    }

    //  Remover serviço por ID
    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> remover(@PathVariable Long id) {
        return servicoServico.removerServico(id);
    }
}
