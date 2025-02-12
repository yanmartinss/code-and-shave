package br.com.api.code_and_shave_back.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import br.com.api.code_and_shave_back.modelo.BarbeiroModelo;
import br.com.api.code_and_shave_back.modelo.ServicoModelo;
import br.com.api.code_and_shave_back.repositorio.BarbeiroRepositorio;
import br.com.api.code_and_shave_back.repositorio.ServicoRepositorio;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BarbeiroServico {

    @Autowired
    private BarbeiroRepositorio barbeiroRepositorio;

    @Autowired
    private ServicoRepositorio servicoRepositorio;

    //  Listar todos os barbeiros
    public ResponseEntity<?> listarTodos() {
        List<BarbeiroModelo> barbeiros = (List<BarbeiroModelo>) barbeiroRepositorio.findAll();

        if (barbeiros.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Nenhum barbeiro cadastrado.");
        }

        return ResponseEntity.ok(barbeiros);
    }

    //  Cadastrar ou atualizar barbeiro
    @Transactional
    public ResponseEntity<?> cadastrarOuAtualizar(BarbeiroModelo barbeiro) {
        if (barbeiro.getName() == null || barbeiro.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"O nome do barbeiro é obrigatório!\"}");
        }
        if (barbeiro.getEmail() == null || barbeiro.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"O e-mail do barbeiro é obrigatório!\"}");
        }
        if (barbeiro.getPhone() == null || barbeiro.getPhone().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"O telefone do barbeiro é obrigatório!\"}");
        }

        //  Verifica se o e-mail já está cadastrado
        Optional<BarbeiroModelo> existingByEmail = barbeiroRepositorio.findByEmail(barbeiro.getEmail());
        if (existingByEmail.isPresent() && (barbeiro.getId() == null || !existingByEmail.get().getId().equals(barbeiro.getId()))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"Este e-mail já está cadastrado!\"}");
        }

        // Verifica se o telefone já está cadastrado
        Optional<BarbeiroModelo> existingByPhone = barbeiroRepositorio.findByPhone(barbeiro.getPhone());
        if (existingByPhone.isPresent() && (barbeiro.getId() == null || !existingByPhone.get().getId().equals(barbeiro.getId()))) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("{\"message\": \"Este telefone já está cadastrado!\"}");
        }

        //  Verifica se os serviços existem antes de salvar
        if (barbeiro.getSpecialties() != null && !barbeiro.getSpecialties().isEmpty()) {
            List<Long> serviceIds = barbeiro.getSpecialties().stream().map(s -> s.getId()).toList();
            List<ServicoModelo> services = (List<ServicoModelo>) servicoRepositorio.findAllById(serviceIds);
            barbeiro.setSpecialties(services);
        }

        BarbeiroModelo barbeiroSalvo = barbeiroRepositorio.save(barbeiro);
        return new ResponseEntity<>(barbeiroSalvo, barbeiro.getId() == null ? HttpStatus.CREATED : HttpStatus.OK);
    }

    //  Remover barbeiro pelo ID
    public ResponseEntity<?> removerBarbeiro(Long id) {
        Optional<BarbeiroModelo> barbeiro = barbeiroRepositorio.findById(id);
        if (barbeiro.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Erro: Barbeiro não encontrado.\"}");
        }

        barbeiroRepositorio.deleteById(id);
        return ResponseEntity.ok("{\"message\": \"Barbeiro removido com sucesso!\"}");
    }

    //  Atualizar barbeiro existente
    @Transactional
    public ResponseEntity<?> atualizarBarbeiro(Long id, BarbeiroModelo barbeiroAtualizado) {
        Optional<BarbeiroModelo> optionalBarbeiro = barbeiroRepositorio.findById(id);

        if (optionalBarbeiro.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Barbeiro não encontrado.\"}");
        }

        BarbeiroModelo barbeiroExistente = optionalBarbeiro.get();
        barbeiroExistente.setName(barbeiroAtualizado.getName());
        barbeiroExistente.setEmail(barbeiroAtualizado.getEmail());
        barbeiroExistente.setPhone(barbeiroAtualizado.getPhone());

        
        if (barbeiroAtualizado.getSpecialties() != null && !barbeiroAtualizado.getSpecialties().isEmpty()) {
            List<Long> serviceIds = barbeiroAtualizado.getSpecialties().stream().map(ServicoModelo::getId).toList();
            List<ServicoModelo> services = (List<ServicoModelo>) servicoRepositorio.findAllById(serviceIds);
            barbeiroExistente.setSpecialties(services);
        }

        BarbeiroModelo atualizado = barbeiroRepositorio.save(barbeiroExistente);
        return ResponseEntity.ok(atualizado);
    }

}
