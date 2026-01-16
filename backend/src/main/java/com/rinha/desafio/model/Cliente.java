package com.rinha.desafio.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "clientes")
public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private Long limite;
    
    @Column(nullable = false)
    private Long saldo = 0L;
    
    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transacao> transacoes = new ArrayList<>();
    
    @Version
    private Long version;
    
    public Cliente() {}
    
    public Cliente(String nome, Long limite) {
        this.nome = nome;
        this.limite = limite;
        this.saldo = 0L;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public Long getLimite() { return limite; }
    public void setLimite(Long limite) { this.limite = limite; }
    
    public Long getSaldo() { return saldo; }
    public void setSaldo(Long saldo) { this.saldo = saldo; }
    
    public List<Transacao> getTransacoes() { return transacoes; }
    public void setTransacoes(List<Transacao> transacoes) { this.transacoes = transacoes; }
    
    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}
