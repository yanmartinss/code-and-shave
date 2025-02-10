package br.com.api.code_and_shave_back.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "servicos")
@Getter
@Setter
public class ServicoModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID auto-gerado pelo banco de dados
    private Long id;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "descricao", length = 255, nullable = false)
    private String descricao;

    @Column(name = "preco", nullable = false)
    private Double preco;

    @Column(name = "duracao", nullable = false)
    private Integer duracao; // Duração em minutos
}