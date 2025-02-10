package br.com.api.code_and_shave_back.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.api.code_and_shave_back.modelo.BarbeiroModelo;
import br.com.api.code_and_shave_back.servico.BarbeiroServico;

@RestController
@RequestMapping("/barbeiros") // 🔹 Define o prefixo das rotas
@CrossOrigin(origins = "*") // 🔹 Permite que o frontend acesse a API
public class BarbeiroControle {

    @Autowired
    private BarbeiroServico barbeiroServico;

    // 🔹 Listar todos os barbeiros
    @GetMapping("/listar")
    public ResponseEntity<?> listarTodos() {
        return barbeiroServico.listarTodos();
    }

    // 🔹 Cadastrar um novo barbeiro ou atualizar um existente
    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarOuAtualizar(@RequestBody BarbeiroModelo barbeiro) {
        return barbeiroServico.cadastrarOuAtualizar(barbeiro);
    }

    // 🔹 Atualizar dados do barbeiro existente
    @PutMapping("/atualizar")
    public ResponseEntity<?> atualizar(@RequestBody BarbeiroModelo barbeiro) {
        return barbeiroServico.cadastrarOuAtualizar(barbeiro);
    }

    // 🔹 Buscar barbeiros por especialidade
    @GetMapping("/especialidade/{especialidade}")
    public ResponseEntity<?> buscarPorEspecialidade(@PathVariable String especialidade) {
        return barbeiroServico.buscarPorEspecialidade(especialidade);
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> remover(@PathVariable Long id) {
        return barbeiroServico.removerBarbeiro(id);
    }
}
