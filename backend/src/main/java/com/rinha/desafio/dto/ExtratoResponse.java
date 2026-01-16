package com.rinha.desafio.dto;

import java.time.ZonedDateTime;
import java.util.List;

public class ExtratoResponse {
    
    private SaldoInfo saldo;
    private List<TransacaoInfo> ultimasTransacoes;
    
    public ExtratoResponse() {}
    
    public ExtratoResponse(SaldoInfo saldo, List<TransacaoInfo> ultimasTransacoes) {
        this.saldo = saldo;
        this.ultimasTransacoes = ultimasTransacoes;
    }
    
    public SaldoInfo getSaldo() { return saldo; }
    public void setSaldo(SaldoInfo saldo) { this.saldo = saldo; }
    
    public List<TransacaoInfo> getUltimasTransacoes() { return ultimasTransacoes; }
    public void setUltimasTransacoes(List<TransacaoInfo> ultimasTransacoes) { 
        this.ultimasTransacoes = ultimasTransacoes; 
    }
    
    public static class SaldoInfo {
        private Long total;
        private ZonedDateTime dataExtrato;
        private Long limite;
        
        public SaldoInfo() {}
        
        public SaldoInfo(Long total, ZonedDateTime dataExtrato, Long limite) {
            this.total = total;
            this.dataExtrato = dataExtrato;
            this.limite = limite;
        }
        
        public Long getTotal() { return total; }
        public void setTotal(Long total) { this.total = total; }
        
        public ZonedDateTime getDataExtrato() { return dataExtrato; }
        public void setDataExtrato(ZonedDateTime dataExtrato) { this.dataExtrato = dataExtrato; }
        
        public Long getLimite() { return limite; }
        public void setLimite(Long limite) { this.limite = limite; }
    }
    
    public static class TransacaoInfo {
        private Long valor;
        private String tipo;
        private String descricao;
        private ZonedDateTime realizadaEm;
        
        public TransacaoInfo() {}
        
        public TransacaoInfo(Long valor, String tipo, String descricao, ZonedDateTime realizadaEm) {
            this.valor = valor;
            this.tipo = tipo;
            this.descricao = descricao;
            this.realizadaEm = realizadaEm;
        }
        
        public Long getValor() { return valor; }
        public void setValor(Long valor) { this.valor = valor; }
        
        public String getTipo() { return tipo; }
        public void setTipo(String tipo) { this.tipo = tipo; }
        
        public String getDescricao() { return descricao; }
        public void setDescricao(String descricao) { this.descricao = descricao; }
        
        public ZonedDateTime getRealizadaEm() { return realizadaEm; }
        public void setRealizadaEm(ZonedDateTime realizadaEm) { this.realizadaEm = realizadaEm; }
    }
}
