package com.softplan.desafio.controller;

import com.softplan.desafio.dto.ExtratoResponse;
import com.softplan.desafio.dto.TransacaoRequest;
import com.softplan.desafio.dto.TransacaoResponse;
import com.softplan.desafio.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    
    private final ClienteService clienteService;
    
    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }
    
    @PostMapping("/{id}/transacoes")
    public ResponseEntity<TransacaoResponse> criarTransacao(
            @PathVariable Long id,
            @Valid @RequestBody TransacaoRequest request) {
        try {
            TransacaoResponse response = clienteService.criarTransacao(id, request);
            return ResponseEntity.ok(response);
        } catch (ClienteService.ClienteNaoEncontradoException e) {
            return ResponseEntity.notFound().build();
        } catch (ClienteService.SaldoInsuficienteException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }
    }
    
    @GetMapping("/{id}/extrato")
    public ResponseEntity<ExtratoResponse> obterExtrato(@PathVariable Long id) {
        try {
            ExtratoResponse response = clienteService.obterExtrato(id);
            return ResponseEntity.ok(response);
        } catch (ClienteService.ClienteNaoEncontradoException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @ExceptionHandler(org.springframework.web.bind.MethodArgumentNotValidException.class)
    public ResponseEntity<Void> handleValidationException() {
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
    }
}
