package br.com.code_and_shave.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.com.code_and_shave.model.Cliente;
import br.com.code_and_shave.repositories.ClienteRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    private static final Pattern EMAIL_PATTERN = 
        Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    private static final Pattern TELEFONE_PATTERN = 
        Pattern.compile("^\\(\\d{2}\\) \\d{5}-\\d{4}$");

    // Cadastrar Cliente com validações detalhadas
    @PostMapping
    public ResponseEntity<?> criarCliente(@Valid @RequestBody Cliente cliente) {
        // Verifica se o e-mail já está cadastrado
        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Erro: E-mail já cadastrado!");
        }

        // Valida formato do e-mail
        if (!EMAIL_PATTERN.matcher(cliente.getEmail()).matches()) {
            return ResponseEntity.badRequest().body("Erro: E-mail inválido!");
        }

        // Valida formato do telefone
        if (!TELEFONE_PATTERN.matcher(cliente.getTelefone()).matches()) {
            return ResponseEntity.badRequest().body("Erro: Telefone inválido! Use o formato (XX) XXXXX-XXXX.");
        }

        // Valida senha (mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial)
        if (!cliente.getSenha().matches("^(?=.[A-Z])(?=.\\d)(?=.*[@#$%^&+=!]).{8,}$")) {
            return ResponseEntity.badRequest().body(
                "Erro: A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula, 1 número e 1 caractere especial.");
        }

        Cliente novoCliente = clienteRepository.save(cliente);
        return ResponseEntity.ok(novoCliente);
    }

    // Listar clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    // Buscar Cliente pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarClientePorId(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Upload de foto do cliente
    @PostMapping("/{id}/uploadFoto")
    public ResponseEntity<String> uploadFotoCliente(@PathVariable Long id, @RequestParam("foto") MultipartFile foto) {
        // Verifica se o cliente existe
        Cliente cliente = clienteRepository.findById(id).orElse(null);
        if (cliente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado!");
        }

        // Diretório onde a foto será salva
        String diretorio = "src/main/resources/static/uploads/";
        String nomeArquivo = "cliente_" + id + "_" + foto.getOriginalFilename();
        Path caminhoDiretorio = Paths.get(diretorio);

        try {
            // Criar diretório se não existir
            if (!Files.exists(caminhoDiretorio)) {
                Files.createDirectories(caminhoDiretorio);
            }

            // Caminho completo do arquivo
            Path caminhoArquivo = caminhoDiretorio.resolve(nomeArquivo);

            // Salvar a foto
            Files.write(caminhoArquivo, foto.getBytes());

            // Atualizar banco de dados
            cliente.setFotoPerfil(nomeArquivo);
            clienteRepository.save(cliente);

            return ResponseEntity.ok("Foto enviada com sucesso!");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a foto.");
        }
    }
}