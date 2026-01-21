package com.rinha.desafio.controller;

import com.rinha.desafio.dto.ExtratoResponse;
import com.rinha.desafio.dto.TransacaoRequest;
import com.rinha.desafio.dto.TransacaoResponse;
import com.rinha.desafio.service.ClienteService;
import com.rinha.desafio.view.ClienteView;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller - Responsável por receber requisições HTTP
 * Coordena entre Service (Model) e View na arquitetura MVC
 */
@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    
    private final ClienteService clienteService; // Model
    private final ClienteView clienteView; // View
    
    public ClienteController(ClienteService clienteService, ClienteView clienteView) {
        this.clienteService = clienteService;
        this.clienteView = clienteView;
    }
    
    /**
     * Endpoint para criar uma transação
     * Controller recebe requisição -> Service processa (Model) -> View formata resposta
     */
    @PostMapping("/{id}/transacoes")
    public ResponseEntity<TransacaoResponse> criarTransacao(
            @PathVariable Long id,
            @Valid @RequestBody TransacaoRequest request) {
        try {
            // Model: processar a lógica de negócio
            TransacaoResponse response = clienteService.criarTransacao(id, request);
            // View: formatar a resposta
            return clienteView.respostaSucessoTransacao(response);
        } catch (ClienteService.ClienteNaoEncontradoException e) {
            return clienteView.respostaClienteNaoEncontrado();
        } catch (ClienteService.SaldoInsuficienteException e) {
            return clienteView.respostaSaldoInsuficiente();
        }
    }
    
    /**
     * Endpoint para obter extrato do cliente
     * Controller recebe requisição -> Service processa (Model) -> View formata resposta
     */
    @GetMapping("/{id}/extrato")
    public ResponseEntity<ExtratoResponse> obterExtrato(@PathVariable Long id) {
        try {
            // Model: processar a lógica de negócio
            ExtratoResponse response = clienteService.obterExtrato(id);
            // View: formatar a resposta
            return clienteView.respostaSucessoExtrato(response);
        } catch (ClienteService.ClienteNaoEncontradoException e) {
            return clienteView.respostaClienteNaoEncontrado();
        }
    }
    
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<Void> handleValidationException() {
        return clienteView.respostaErroValidacao();
    }
}
