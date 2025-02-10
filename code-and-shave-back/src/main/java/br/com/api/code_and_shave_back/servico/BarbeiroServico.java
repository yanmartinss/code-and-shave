package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.code_and_shave_back.modelo.BarbeiroModelo;
import br.com.api.code_and_shave_back.repositorio.BarbeiroRepositorio;
import java.util.List;

@Service
public class BarbeiroServico {

    @Autowired
    private BarbeiroRepositorio barbeiroRepositorio;

    // 🔹 Listar todos os barbeiros com tratamento de erro
    public ResponseEntity<?> listarTodos() {
        List<BarbeiroModelo> barbeiros = (List<BarbeiroModelo>) barbeiroRepositorio.findAll();
        
        if (barbeiros.isEmpty()) {
            return new ResponseEntity<>("Nenhum barbeiro cadastrado.", HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(barbeiros, HttpStatus.OK);
    }

    // 🔹 Cadastrar ou atualizar barbeiro com validações adicionais
    public ResponseEntity<?> cadastrarOuAtualizar(BarbeiroModelo barbeiro) {
        if (barbeiro.getNome() == null || barbeiro.getNome().trim().isEmpty()) {
            return new ResponseEntity<>("O nome do barbeiro é obrigatório!", HttpStatus.BAD_REQUEST);
        }
        if (barbeiro.getEmail() == null || barbeiro.getEmail().trim().isEmpty()) {
            return new ResponseEntity<>("O e-mail do barbeiro é obrigatório!", HttpStatus.BAD_REQUEST);
        }
        if (barbeiro.getTelefone() == null || barbeiro.getTelefone().trim().isEmpty()) {
            return new ResponseEntity<>("O telefone do barbeiro é obrigatório!", HttpStatus.BAD_REQUEST);
        }
        if (barbeiro.getEspecialidade() == null || barbeiro.getEspecialidade().trim().isEmpty()) {
            return new ResponseEntity<>("A especialidade do barbeiro é obrigatória!", HttpStatus.BAD_REQUEST);
        }

        // 🔹 Verificar se já existe um barbeiro com o mesmo e-mail
        List<BarbeiroModelo> barbeirosComMesmoEmail = barbeiroRepositorio.findByEmail(barbeiro.getEmail());
        if (!barbeirosComMesmoEmail.isEmpty() && (barbeiro.getIdbarbeiro() == null || 
            barbeirosComMesmoEmail.stream().anyMatch(b -> !b.getIdbarbeiro().equals(barbeiro.getIdbarbeiro())))) {
            
            System.out.println("Tentativa de cadastro com e-mail duplicado: " + barbeiro.getEmail());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"O e-mail já está cadastrado!\"}");
        }

        // 🔹 Verificar se já existe um barbeiro com o mesmo telefone
        List<BarbeiroModelo> barbeirosComMesmoTelefone = barbeiroRepositorio.findByTelefone(barbeiro.getTelefone());
        if (!barbeirosComMesmoTelefone.isEmpty() && (barbeiro.getIdbarbeiro() == null || 
            barbeirosComMesmoTelefone.stream().anyMatch(b -> !b.getIdbarbeiro().equals(barbeiro.getIdbarbeiro())))) {
            
            System.out.println("Tentativa de cadastro com telefone duplicado: " + barbeiro.getTelefone());
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"O telefone já está cadastrado!\"}");
        }

        // 🔹 Normaliza a especialidade (removendo espaços extras)
        barbeiro.setEspecialidade(barbeiro.getEspecialidade().trim());

        // Verifica se é um novo cadastro ou uma atualização
        boolean isNovo = (barbeiro.getIdbarbeiro() == null);
        BarbeiroModelo barbeiroSalvo = barbeiroRepositorio.save(barbeiro);

        return new ResponseEntity<>(barbeiroSalvo, isNovo ? HttpStatus.CREATED : HttpStatus.OK);
    }

    // 🔹 Buscar barbeiros por especialidade com verificação
    public ResponseEntity<?> buscarPorEspecialidade(String especialidade) {
        if (especialidade == null || especialidade.trim().isEmpty()) {
            return new ResponseEntity<>("A especialidade é obrigatória!", HttpStatus.BAD_REQUEST);
        }

        List<BarbeiroModelo> barbeiros = (List<BarbeiroModelo>) barbeiroRepositorio.findByEspecialidade(especialidade.trim());

        if (barbeiros.isEmpty()) {
            return new ResponseEntity<>("Nenhum barbeiro encontrado para essa especialidade.", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(barbeiros, HttpStatus.OK);
    }

    public ResponseEntity<?> removerBarbeiro(Long id) {
        if (!barbeiroRepositorio.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Erro: Barbeiro não encontrado.\"}");
        }
    
        barbeiroRepositorio.deleteById(id);
        return ResponseEntity.ok("{\"message\": \"Barbeiro removido com sucesso!\"}");
    }
}