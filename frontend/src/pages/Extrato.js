import React, { useState } from 'react';
import useExtratoController from '../controllers/ExtratoController';
import ExtratoView from '../views/ExtratoView';

/**
 * Página de Extrato
 * Integra Controller e View seguindo arquitetura MVC
 */
function Extrato() {
  const [clienteId, setClienteId] = useState(1);
  const controller = useExtratoController();

  return (
    <ExtratoView
      extrato={controller.extrato}
      loading={controller.loading}
      erro={controller.erro}
      mensagem={controller.mensagem}
      clienteId={clienteId}
      onClienteIdChange={setClienteId}
      onBuscarExtrato={controller.buscarExtrato}
      formatarData={controller.formatarData}
      formatarValor={controller.formatarValor}
      obterCorTipo={controller.obterCorTipo}
      obterLabelTipo={controller.obterLabelTipo}
    />
  );
}

export default Extrato;

