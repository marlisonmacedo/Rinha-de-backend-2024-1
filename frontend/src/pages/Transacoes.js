import React from 'react';
import useTransacaoController from '../controllers/TransacaoController';
import TransacaoView from '../views/TransacaoView';

/**
 * Página de Transações
 * Integra Controller e View seguindo arquitetura MVC
 */
function Transacoes() {
  const controller = useTransacaoController();

  return (
    <TransacaoView
      clienteId={controller.clienteId}
      valor={controller.valor}
      tipo={controller.tipo}
      descricao={controller.descricao}
      loading={controller.loading}
      resultado={controller.resultado}
      erro={controller.erro}
      onClienteIdChange={controller.setClienteId}
      onValorChange={controller.setValor}
      onTipoChange={controller.setTipo}
      onDescricaoChange={controller.setDescricao}
      onGerarAleatorio={controller.gerarTransacaoAleatoria}
      onEnviarTransacao={controller.enviarTransacao}
    />
  );
}

export default Transacoes;

