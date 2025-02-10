package br.com.api.code_and_shave_back.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "barbeiros")
@Getter
@Setter
public class BarbeiroModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idbarbeiro") // 🔹 Isso garante que a coluna no banco seja 'id'
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String telefone;

    @ManyToMany
    @JoinTable(
        name = "barbeiro_servicos",
        joinColumns = @JoinColumn(name = "barbeiro_id"),
        inverseJoinColumns = @JoinColumn(name = "servico_id")
    )
    private List<ServicoModelo> especialidades;
}