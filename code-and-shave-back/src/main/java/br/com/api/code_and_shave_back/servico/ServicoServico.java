package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import br.com.api.code_and_shave_back.modelo.ServicoModelo;
import br.com.api.code_and_shave_back.repositorio.ServicoRepositorio;
import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class ServicoServico {

    @Autowired
    private ServicoRepositorio servicoRepositorio;

    
    public ResponseEntity<?> listarTodos() {
        List<ServicoModelo> servicos = (List<ServicoModelo>) servicoRepositorio.findAll();

        if (servicos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum serviço cadastrado.");
        }

        return ResponseEntity.ok(servicos);
    }

    
    public ResponseEntity<?> cadastrarOuAtualizar(ServicoModelo servico) {
        if (servico.getNome() == null || servico.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"O nome do serviço é obrigatório!\"}");
        }
        if (servico.getDescricao() == null || servico.getDescricao().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"A descrição do serviço é obrigatória!\"}");
        }
        if (servico.getPreco() == null || servico.getPreco() <= 0) {
            return ResponseEntity.badRequest().body("{\"message\": \"O preço do serviço deve ser maior que zero!\"}");
        }
        if (servico.getDuracao() == null || servico.getDuracao() <= 0) {
            return ResponseEntity.badRequest().body("{\"message\": \"A duração do serviço deve ser maior que zero!\"}");
        }

        // Verifica se o serviço já existe pelo nome
        List<ServicoModelo> servicosComMesmoNome = servicoRepositorio.findByNome(servico.getNome());
        if (!servicosComMesmoNome.isEmpty() && (servico.getId() == null ||
            servicosComMesmoNome.stream().anyMatch(s -> !s.getId().equals(servico.getId())))) {
            
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"Já existe um serviço com esse nome!\"}");
        }

        ServicoModelo servicoSalvo = servicoRepositorio.save(servico);
        return new ResponseEntity<>(servicoSalvo, servico.getId() == null ? HttpStatus.CREATED : HttpStatus.OK);
    }

   
    @Transactional
    public ResponseEntity<?> removerServico(Long id) {
        if (!servicoRepositorio.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Erro: Serviço não encontrado.\"}");
        }

        try {
            
            servicoRepositorio.removerVinculosComBarbeiros(id);

            
            servicoRepositorio.deleteById(id);
            return ResponseEntity.ok("{\"message\": \"Serviço removido com sucesso!\"}");
        } catch (Exception e) {
            System.out.println("Erro ao remover serviço: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\": \"Erro ao remover serviço.\"}");
        }
}  
}
