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
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    
    @ManyToMany
    @JoinTable(
        name = "barbeiro_servico",
        joinColumns = @JoinColumn(name = "barbeiro_id"),
        inverseJoinColumns = @JoinColumn(name = "servico_id")
    )
    private List<ServicoModelo> specialties;
}
