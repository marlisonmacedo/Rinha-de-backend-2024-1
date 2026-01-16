package com.softplan.desafio.model;

import jakarta.persistence.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "transacoes")
public class Transacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
    
    @Column(nullable = false)
    private Long valor;
    
    @Column(nullable = false, length = 1)
    private String tipo;
    
    @Column(nullable = false, length = 10)
    private String descricao;
    
    @Column(name = "realizada_em", nullable = false)
    private ZonedDateTime realizadaEm;
    
    public Transacao() {}
    
    public Transacao(Cliente cliente, Long valor, String tipo, String descricao) {
        this.cliente = cliente;
        this.valor = valor;
        this.tipo = tipo;
        this.descricao = descricao;
        this.realizadaEm = ZonedDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }
    
    public Long getValor() { return valor; }
    public void setValor(Long valor) { this.valor = valor; }
    
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public ZonedDateTime getRealizadaEm() { return realizadaEm; }
    public void setRealizadaEm(ZonedDateTime realizadaEm) { this.realizadaEm = realizadaEm; }
}
