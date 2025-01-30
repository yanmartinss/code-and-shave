package br.com.code_and_shave.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Entity
@Table(name = "agendamentos")
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "A data e a hora são obrigatórias")
    @Future(message = "A data e a hora devem ser no futuro!")
    @Column(nullable = false)
    private LocalDateTime dataHora;

    @NotBlank(message = "O serviço é obrigatório")
    @Column(nullable = false, length = 50)
    private String servico;

    @NotNull(message = "O cliente é obrigatório")
    @ManyToOne
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    @NotNull(message = "O barbeiro é obrigatório")
    @ManyToOne
    @JoinColumn(name = "id_barbeiro", nullable = false)
    private Barbeiro barbeiro;

    public Agendamento() {
    }

    public Agendamento(Long id, LocalDateTime dataHora, String servico, Cliente cliente, Barbeiro barbeiro) {
        this.id = id;
        this.dataHora = dataHora;
        this.servico = servico;
        this.cliente = cliente;
        this.barbeiro = barbeiro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getServico() {
        return servico;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Barbeiro getBarbeiro() {
        return barbeiro;
    }

    public void setBarbeiro(Barbeiro barbeiro) {
        this.barbeiro = barbeiro;
    }

    

    

}
