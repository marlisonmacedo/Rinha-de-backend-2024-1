package com.rinha.desafio.view;

import com.rinha.desafio.dto.ExtratoResponse;
import com.rinha.desafio.dto.TransacaoResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * View - Responsável por formatar as respostas para o cliente
 * Camada de apresentação da arquitetura MVC
 */
@Component
public class ClienteView {
    
    /**
     * Formata resposta de sucesso para transação
     */
    public ResponseEntity<TransacaoResponse> respostaSucessoTransacao(TransacaoResponse response) {
        return ResponseEntity.ok(response);
    }
    
    /**
     * Formata resposta de sucesso para extrato
     */
    public ResponseEntity<ExtratoResponse> respostaSucessoExtrato(ExtratoResponse response) {
        return ResponseEntity.ok(response);
    }
    
    /**
     * Formata resposta para cliente não encontrado
     */
    public <T> ResponseEntity<T> respostaClienteNaoEncontrado() {
        return ResponseEntity.notFound().build();
    }
    
    /**
     * Formata resposta para saldo insuficiente
     */
    public <T> ResponseEntity<T> respostaSaldoInsuficiente() {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
    }
    
    /**
     * Formata resposta para erro de validação
     */
    public <T> ResponseEntity<T> respostaErroValidacao() {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
    }
}
