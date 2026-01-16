package com.rinha.desafio.repository;

import com.rinha.desafio.model.Cliente;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Cliente> findWithLockById(Long id);
}
