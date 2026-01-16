package com.softplan.desafio.service;

import com.softplan.desafio.dto.ExtratoResponse;
import com.softplan.desafio.dto.TransacaoRequest;
import com.softplan.desafio.dto.TransacaoResponse;
import com.softplan.desafio.model.Cliente;
import com.softplan.desafio.model.Transacao;
import com.softplan.desafio.repository.ClienteRepository;
import com.softplan.desafio.repository.TransacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {
    
    private final ClienteRepository clienteRepository;
    private final TransacaoRepository transacaoRepository;
    
    public ClienteService(ClienteRepository clienteRepository, TransacaoRepository transacaoRepository) {
        this.clienteRepository = clienteRepository;
        this.transacaoRepository = transacaoRepository;
    }
    
    @Transactional
    public TransacaoResponse criarTransacao(Long clienteId, TransacaoRequest request) {
        Cliente cliente = clienteRepository.findWithLockById(clienteId)
                .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente não encontrado"));
        
        Long novoSaldo = calcularNovoSaldo(cliente.getSaldo(), request.getValor(), request.getTipo());
        
        if (novoSaldo < -cliente.getLimite()) {
            throw new SaldoInsuficienteException("Saldo insuficiente para realizar a transação");
        }
        
        cliente.setSaldo(novoSaldo);
        clienteRepository.save(cliente);
        
        Transacao transacao = new Transacao(cliente, request.getValor(), request.getTipo(), request.getDescricao());
        transacaoRepository.save(transacao);
        
        return new TransacaoResponse(cliente.getLimite(), novoSaldo);
    }
    
    @Transactional(readOnly = true)
    public ExtratoResponse obterExtrato(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new ClienteNaoEncontradoException("Cliente não encontrado"));
        
        List<Transacao> transacoes = transacaoRepository.findTop10ByClienteIdOrderByRealizadaEmDesc(clienteId);
        
        ExtratoResponse.SaldoInfo saldoInfo = new ExtratoResponse.SaldoInfo(
            cliente.getSaldo(),
            ZonedDateTime.now(),
            cliente.getLimite()
        );
        
        List<ExtratoResponse.TransacaoInfo> transacoesInfo = transacoes.stream()
            .map(t -> new ExtratoResponse.TransacaoInfo(
                t.getValor(),
                t.getTipo(),
                t.getDescricao(),
                t.getRealizadaEm()
            ))
            .collect(Collectors.toList());
        
        return new ExtratoResponse(saldoInfo, transacoesInfo);
    }
    
    private Long calcularNovoSaldo(Long saldoAtual, Long valor, String tipo) {
        if ("r".equals(tipo)) {
            return saldoAtual + valor;
        } else {
            return saldoAtual - valor;
        }
    }
    
    public static class ClienteNaoEncontradoException extends RuntimeException {
        public ClienteNaoEncontradoException(String message) {
            super(message);
        }
    }
    
    public static class SaldoInsuficienteException extends RuntimeException {
        public SaldoInsuficienteException(String message) {
            super(message);
        }
    }
}
