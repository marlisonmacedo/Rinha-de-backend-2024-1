package com.softplan.desafio.repository;

import com.softplan.desafio.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    
    @Query("SELECT t FROM Transacao t WHERE t.cliente.id = :clienteId ORDER BY t.realizadaEm DESC LIMIT 10")
    List<Transacao> findTop10ByClienteIdOrderByRealizadaEmDesc(@Param("clienteId") Long clienteId);
}
