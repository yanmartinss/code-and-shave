package br.com.api.code_and_shave_back.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "agendamentos")
@Getter
@Setter
@NoArgsConstructor
public class AgendamentoModeloCliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private LocalDate data;
    
    @Column(nullable = false)
    private LocalTime horario;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private UsuarioModelo cliente;
    
    @ManyToOne
    @JoinColumn(name = "barbeiro_id", nullable = false)
    private BarbeiroModelo barbeiro;
    
    @ManyToOne
    @JoinColumn(name = "servico_id", nullable = false)
    private ServicoModelo servico;
}
