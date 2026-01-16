import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9999';

function Transacoes() {
  const [clienteId, setClienteId] = useState(1);
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('r');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState(null);

  const gerarTransacaoAleatoria = () => {
    const valorAleatorio = Math.floor(Math.random() * 10000) + 100;
    const tipoAleatorio = Math.random() > 0.5 ? 'r' : 'd';
    const descricoes = ['compra', 'venda', 'pagamento', 'recebido', 'taxa', 'bonus', 'desconto'];
    const descricaoAleatoria = descricoes[Math.floor(Math.random() * descricoes.length)];
    
    setValor(valorAleatorio.toString());
    setTipo(tipoAleatorio);
    setDescricao(descricaoAleatoria);
  };

  const enviarTransacao = async () => {
    setLoading(true);
    setErro(null);
    setResultado(null);

    try {
      const response = await axios.post(
        `${API_URL}/clientes/${clienteId}/transacoes`,
        {
          valor: parseInt(valor),
          tipo: tipo,
          descricao: descricao
        }
      );

      setResultado(response.data);
      
      // Enviar mensagem para outras abas
      const channel = new BroadcastChannel('transacoes_channel');
      channel.postMessage({
        tipo: 'nova_transacao',
        clienteId: clienteId,
        timestamp: new Date().toISOString()
      });
      channel.close();

    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErro('Cliente não encontrado');
        } else if (error.response.status === 422) {
          setErro('Transação inválida ou saldo insuficiente');
        } else {
          setErro('Erro ao processar transação');
        }
      } else {
        setErro('Erro de conexão com o servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Criar Transação
        </Typography>

        <Box sx={{ mt: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Cliente</InputLabel>
            <Select
              value={clienteId}
              label="Cliente"
              onChange={(e) => setClienteId(e.target.value)}
            >
              <MenuItem value={1}>Cliente 1 - Limite: R$ 1.000,00</MenuItem>
              <MenuItem value={2}>Cliente 2 - Limite: R$ 800,00</MenuItem>
              <MenuItem value={3}>Cliente 3 - Limite: R$ 10.000,00</MenuItem>
              <MenuItem value={4}>Cliente 4 - Limite: R$ 100.000,00</MenuItem>
              <MenuItem value={5}>Cliente 5 - Limite: R$ 5.000,00</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Valor (centavos)"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo</InputLabel>
            <Select
              value={tipo}
              label="Tipo"
              onChange={(e) => setTipo(e.target.value)}
            >
              <MenuItem value="r">Recebível (r)</MenuItem>
              <MenuItem value="d">Débito (d)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Descrição (1-10 caracteres)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            inputProps={{ maxLength: 10 }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={gerarTransacaoAleatoria}
              disabled={loading}
            >
              Gerar Valores Aleatórios
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={enviarTransacao}
              disabled={loading || !valor || !descricao}
            >
              {loading ? <CircularProgress size={24} /> : 'Enviar Transação'}
            </Button>
          </Box>
        </Box>

        {erro && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {erro}
          </Alert>
        )}

        {resultado && (
          <Card sx={{ mt: 3, bgcolor: 'success.light' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Transação realizada com sucesso!
              </Typography>
              <Typography variant="body1">
                Limite: R$ {(resultado.limite / 100).toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Novo Saldo: R$ {(resultado.saldo / 100).toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                Mensagem enviada para a aba de extrato
              </Typography>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
}

export default Transacoes;
