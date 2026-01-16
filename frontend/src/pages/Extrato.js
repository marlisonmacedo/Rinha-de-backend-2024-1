import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9999';

function Extrato() {
  const [extrato, setExtrato] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    // Escutar mensagens de outras abas
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

  const buscarExtrato = async (clienteId) => {
    setLoading(true);
    setErro(null);

    try {
      const response = await axios.get(
        `${API_URL}/clientes/${clienteId}/extrato`
      );

      setExtrato(response.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErro('Cliente não encontrado');
        } else {
          setErro('Erro ao buscar extrato');
        }
      } else {
        setErro('Erro de conexão com o servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR');
  };

  const formatarValor = (valor) => {
    return `R$ ${(valor / 100).toFixed(2)}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Extrato do Cliente
        </Typography>

        {mensagem && (
          <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
            Nova transação recebida do Cliente {mensagem.clienteId} em {formatarData(mensagem.timestamp)}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {erro && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {erro}
          </Alert>
        )}

        {!loading && !extrato && !erro && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Aguardando transação de outra aba...
          </Alert>
        )}

        {extrato && !loading && (
          <Box sx={{ mt: 3 }}>
            <Card sx={{ mb: 3, bgcolor: 'primary.light', color: 'white' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Informações do Saldo
                </Typography>
                <Typography variant="body1">
                  <strong>Saldo Total:</strong> {formatarValor(extrato.saldo.total)}
                </Typography>
                <Typography variant="body1">
                  <strong>Limite:</strong> {formatarValor(extrato.saldo.limite)}
                </Typography>
                <Typography variant="body1">
                  <strong>Saldo Disponível:</strong> {formatarValor(extrato.saldo.total + extrato.saldo.limite)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Data do extrato: {formatarData(extrato.saldo.dataExtrato)}
                </Typography>
              </CardContent>
            </Card>

            <Typography variant="h5" gutterBottom>
              Últimas Transações
            </Typography>

            {extrato.ultimasTransacoes.length === 0 ? (
              <Alert severity="info" sx={{ mt: 2 }}>
                Nenhuma transação encontrada
              </Alert>
            ) : (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Valor</strong></TableCell>
                      <TableCell><strong>Tipo</strong></TableCell>
                      <TableCell><strong>Descrição</strong></TableCell>
                      <TableCell><strong>Realizada em</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {extrato.ultimasTransacoes.map((transacao, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatarValor(transacao.valor)}</TableCell>
                        <TableCell>
                          <Chip
                            label={transacao.tipo === 'r' ? 'Recebível' : 'Débito'}
                            color={transacao.tipo === 'r' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{transacao.descricao}</TableCell>
                        <TableCell>{formatarData(transacao.realizadaEm)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Extrato;
