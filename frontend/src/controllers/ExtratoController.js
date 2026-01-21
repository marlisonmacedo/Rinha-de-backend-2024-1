import { useState, useEffect } from 'react';
import ExtratoModel from '../models/ExtratoModel';

/**
 * Controller - Responsável por coordenar entre Model e View
 * Gerencia o estado e lógica de controle do extrato
 */

const useExtratoController = () => {
  const [extrato, setExtrato] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  /**
   * Escutar atualizações de outras abas
   */
  useEffect(() => {
    const channel = new BroadcastChannel('transacoes_channel');
    
    channel.onmessage = (event) => {
      if (event.data.tipo === 'nova_transacao') {
        setMensagem({
          clienteId: event.data.clienteId,
          timestamp: event.data.timestamp
        });
        buscarExtrato(event.data.clienteId);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  /**
   * Busca o extrato de um cliente
   */
  const buscarExtrato = async (clienteId) => {
    setLoading(true);
    setErro(null);

    const response = await ExtratoModel.buscarExtrato(clienteId);

    setLoading(false);

    if (response.sucesso) {
      setExtrato(response.dados);
    } else {
      setErro(response.erro);
      setExtrato(null);
    }
  };

  /**
   * Formata data usando o Model
   */
  const formatarData = (data) => {
    return ExtratoModel.formatarData(data);
  };

  /**
   * Formata valor usando o Model
   */
  const formatarValor = (valor) => {
    return ExtratoModel.formatarValor(valor);
  };

  /**
   * Obtém cor do tipo usando o Model
   */
  const obterCorTipo = (tipo) => {
    return ExtratoModel.obterCorTipo(tipo);
  };

  /**
   * Obtém label do tipo usando o Model
   */
  const obterLabelTipo = (tipo) => {
    return ExtratoModel.obterLabelTipo(tipo);
  };

  return {
    // Estado
    extrato,
    loading,
    erro,
    mensagem,
    // Ações
    buscarExtrato,
    formatarData,
    formatarValor,
    obterCorTipo,
    obterLabelTipo,
    setMensagem
  };
};

export default useExtratoController;
