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
@Table(name = "usuarios")
@Getter
@Setter
public class UsuarioModelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    @Column(unique = true, nullable = false)
    private String EMAIL;
    @Column(nullable = false)
    private String NOME;
    @Column(unique = true, nullable = false)
    private String TELEFONE;
    @Column(nullable = false)
    private String SENHA;
    @Column(nullable = false)
    private String TIPO;
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean ativo = true;

}
