package br.com.api.code_and_shave_back.modelo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "agendamentos_cliente")  // Defina um nome exclusivo para evitar conflito com AgendamentoModelo
@Getter
@Setter
public class AgendamentoModeloCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime horario;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private UsuarioModelo cliente;  // Alterado de String para UsuarioModelo

    @ManyToOne
    @JoinColumn(name = "barbeiro_id", nullable = false)
    private BarbeiroModelo barbeiro;  // Adicionado relacionamento

    @ManyToOne
    @JoinColumn(name = "servico_id", nullable = false)
    private ServicoModelo servico;  // Adicionado relacionamento
}
