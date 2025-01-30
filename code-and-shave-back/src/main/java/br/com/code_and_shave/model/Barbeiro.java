package br.com.code_and_shave.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "barbeiros")
public class Barbeiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID auto-gerado pelo banco de dados
    private Long idbarbeiro;

    @NotBlank(message = "O nome é obrigatório")
    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @NotBlank(message = "A especialidade é obrigatória!")
    @Column(name = "especialidade", length = 50)
    private String especialidade;

    @NotBlank(message = "O telefone é obrigatório!")
    @Column(name = "telefone", length = 15)
    private String telefone;

    @Email(message = "O e-mail deve ser válido!")
    @NotBlank(message = "O e-mail é obrigatório!")
    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;

    @NotBlank(message = "A senha é obrigatória!")
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres!")
    @Column(name = "senha", nullable = false, length = 255)
    private String senha;

    // Construtor sem argumentos (obrigatório para frameworks como JPA/Hibernate)
    public Barbeiro() {
    }

    // Construtor com argumentos
    public Barbeiro(Long idbarbeiro, String nome, String especialidade, String telefone, String email, String senha) {
        this.idbarbeiro = idbarbeiro;
        this.nome = nome;
        this.especialidade = especialidade;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
    }

    // Getters e Setters
    public Long getIdbarbeiro() {
        return idbarbeiro;
    }

    public void setIdbarbeiro(Long idbarbeiro) {
        this.idbarbeiro = idbarbeiro;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
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

    @Override
    public String toString() {
        return "Barbeiro{" +
                "idbarbeiro=" + idbarbeiro +
                ", nome='" + nome + '\'' +
                ", especialidade='" + especialidade + '\'' +
                ", telefone='" + telefone + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
