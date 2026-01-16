package com.softplan.desafio.dto;

import jakarta.validation.constraints.*;

public class TransacaoRequest {
    
    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    private Long valor;
    
    @NotBlank(message = "Tipo é obrigatório")
    @Pattern(regexp = "^[rd]$", message = "Tipo deve ser 'r' ou 'd'")
    private String tipo;
    
    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 1, max = 10, message = "Descrição deve ter entre 1 e 10 caracteres")
    private String descricao;
    
    public TransacaoRequest() {}
    
    public TransacaoRequest(Long valor, String tipo, String descricao) {
        this.valor = valor;
        this.tipo = tipo;
        this.descricao = descricao;
    }
    
    public Long getValor() { return valor; }
    public void setValor(Long valor) { this.valor = valor; }
    
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}
