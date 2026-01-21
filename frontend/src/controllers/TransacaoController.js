import { useState } from 'react';
import TransacaoModel from '../models/TransacaoModel';

/**
 * Controller - Responsável por coordenar entre Model e View
 * Gerencia o estado e lógica de controle da aplicação
 */

const useTransacaoController = () => {
  const [clienteId, setClienteId] = useState(1);
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('r');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);

  /**
   * Gera uma transação aleatória
   */
  const gerarTransacaoAleatoria = () => {
    const dadosAleatorios = TransacaoModel.gerarTransacaoAleatoria();
    setValor(dadosAleatorios.valor.toString());
    setTipo(dadosAleatorios.tipo);
    setDescricao(dadosAleatorios.descricao);
  };

  /**
   * Envia a transação para o backend
   */
  const enviarTransacao = async () => {
    // Validação local
    const errosValidacao = TransacaoModel.validarTransacao(valor, descricao);
    if (errosValidacao.length > 0) {
      setErro(errosValidacao.join(', '));
      return;
    }

    setLoading(true);
    setErro(null);
    setResultado(null);

    // Chamar o Model para processar
    const response = await TransacaoModel.criarTransacao(clienteId, {
      valor: parseInt(valor),
      tipo,
      descricao
    });

    setLoading(false);

    if (response.sucesso) {
      setResultado(response.dados);
      
      // Notificar outras abas
      try {
        const channel = new BroadcastChannel('transacoes_channel');
        channel.postMessage({
          tipo: 'nova_transacao',
          clienteId: clienteId,
          timestamp: new Date().toISOString()
        });
        channel.close();
      } catch (err) {
        console.error('Erro ao notificar outras abas:', err);
      }

      // Limpar formulário
      setValor('');
      setDescricao('');
    } else {
      setErro(response.erro);
    }
  };

  return {
    // Estado
    clienteId,
    valor,
    tipo,
    descricao,
    loading,
    resultado,
    erro,
    // Ações
    setClienteId,
    setValor,
    setTipo,
    setDescricao,
    gerarTransacaoAleatoria,
    enviarTransacao
  };
};

export default useTransacaoController;
