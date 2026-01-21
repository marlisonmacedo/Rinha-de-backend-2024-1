import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9999';

/**
 * Model - Responsável pela lógica de negócio e acesso a dados
 * Camada de Model na arquitetura MVC
 */

class TransacaoModel {
  /**
   * Cria uma nova transação
   */
  async criarTransacao(clienteId, transacaoData) {
    try {
      const response = await axios.post(
        `${API_URL}/clientes/${clienteId}/transacoes`,
        transacaoData
      );
      return { sucesso: true, dados: response.data };
    } catch (error) {
      return this.tratarErro(error);
    }
  }

  /**
   * Gera dados de transação aleatória
   */
  gerarTransacaoAleatoria() {
    const valor = Math.floor(Math.random() * 10000) + 100;
    const tipo = Math.random() > 0.5 ? 'r' : 'd';
    const descricoes = ['compra', 'venda', 'pagamento', 'recebido', 'taxa', 'bonus', 'desconto'];
    const descricao = descricoes[Math.floor(Math.random() * descricoes.length)];
    
    return { valor, tipo, descricao };
  }

  /**
   * Valida dados da transação
   */
  validarTransacao(valor, descricao) {
    const erros = [];
    
    if (!valor || valor <= 0) {
      erros.push('Valor deve ser maior que zero');
    }
    
    if (!descricao || descricao.trim().length === 0) {
      erros.push('Descrição é obrigatória');
    } else if (descricao.length > 10) {
      erros.push('Descrição deve ter no máximo 10 caracteres');
    }
    
    return erros;
  }

  /**
   * Trata erros da API
   */
  tratarErro(error) {
    if (error.response) {
      if (error.response.status === 404) {
        return { sucesso: false, erro: 'Cliente não encontrado' };
      } else if (error.response.status === 422) {
        return { sucesso: false, erro: 'Saldo insuficiente ou dados inválidos' };
      }
    }
    return { sucesso: false, erro: 'Erro ao processar transação' };
  }
}

export default new TransacaoModel();
