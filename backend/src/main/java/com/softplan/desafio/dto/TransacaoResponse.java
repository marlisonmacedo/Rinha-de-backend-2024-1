package com.softplan.desafio.dto;

public class TransacaoResponse {
    
    private Long limite;
    private Long saldo;
    
    public TransacaoResponse() {}
    
    public TransacaoResponse(Long limite, Long saldo) {
        this.limite = limite;
        this.saldo = saldo;
    }
    
    public Long getLimite() { return limite; }
    public void setLimite(Long limite) { this.limite = limite; }
    
    public Long getSaldo() { return saldo; }
    public void setSaldo(Long saldo) { this.saldo = saldo; }
}
