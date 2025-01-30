package br.com.code_and_shave.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name= "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClientes;
    
    @NotBlank(message = "O nome é obrigatório!")
    @Column(nullable = false, length = 100)
    private String nome;

    @Email(message = "O e-mail deve ser válido!")
    @NotBlank(message = "O e-mail é obrigatório!")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank(message = "A senha é obrigatória!")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    @Column(nullable = false)
    private String senha;

    @NotBlank(message = "O telefone é obrigatório!")
    @Column(nullable = false, length = 15)
    private String telefone;

    @Column(name = "foto_perfil")
    private String fotoPerfil;

    

    public Cliente(Long idClientes, @NotBlank(message = "O nome é obrigatório!") String nome,
            @Email(message = "O e-mail deve ser válido!") @NotBlank(message = "O e-mail é obrigatório!") String email,
            @NotBlank(message = "A senha é obrigatória!") @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres") String senha,
            @NotBlank(message = "O telefone é obrigatório!") String telefone, String fotoPerfil) {
        this.idClientes = idClientes;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.fotoPerfil = fotoPerfil;
    }


    public Cliente() {
    }

    public Long getIdClientes() {
        return idClientes;
    }

    public void setIdClientes(Long idClientes) {
        this.idClientes = idClientes;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }


    public boolean isPresent() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'isPresent'");
    }


  
}
