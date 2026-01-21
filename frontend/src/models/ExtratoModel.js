import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9999';

/**
 * Model - Responsável pela lógica de negócio e acesso a dados de extrato
 * Camada de Model na arquitetura MVC
 */

class ExtratoModel {
  /**
   * Busca o extrato de um cliente
   */
  async buscarExtrato(clienteId) {
    try {
      const response = await axios.get(
        `${API_URL}/clientes/${clienteId}/extrato`
      );
      return { sucesso: true, dados: response.data };
    } catch (error) {
      return this.tratarErro(error);
    }
  }

  /**
   * Formata a data para exibição
   */
  formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  /**
   * Formata o valor para exibição
   */
  formatarValor(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor / 100);
  }

  /**
   * Obtém a cor do tipo de transação
   */
  obterCorTipo(tipo) {
    return tipo === 'r' ? 'success' : 'error';
  }

  /**
   * Obtém o label do tipo de transação
   */
  obterLabelTipo(tipo) {
    return tipo === 'r' ? 'Recebimento' : 'Débito';
  }

  /**
   * Trata erros da API
   */
  tratarErro(error) {
    if (error.response && error.response.status === 404) {
      return { sucesso: false, erro: 'Cliente não encontrado' };
    }
    return { sucesso: false, erro: 'Erro ao buscar extrato' };
  }
}

export default new ExtratoModel();
