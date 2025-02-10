package br.com.api.code_and_shave_back.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "barbeiros")
@Setter
@Getter
public class BarbeiroModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID auto-gerado pelo banco de dados
    private Long idbarbeiro;

    @Column(name = "nome", length = 100, nullable = false)
    private String nome;

    @Column(name = "especialidade", length = 50)
    private String especialidade;

    @Column(name = "telefone", length = 15)
    private String telefone;

    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;
}