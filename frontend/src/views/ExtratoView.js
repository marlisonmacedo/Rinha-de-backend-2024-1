import React from 'react';
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
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

/**
 * View - Componente de apresentação para Extrato
 * Camada de View na arquitetura MVC
 */

const ExtratoView = ({
  extrato,
  loading,
  erro,
  mensagem,
  clienteId,
  onClienteIdChange,
  onBuscarExtrato,
  formatarData,
  formatarValor,
  obterCorTipo,
  obterLabelTipo
}) => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Extrato Bancário
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={clienteId}
                label="Cliente"
                onChange={(e) => onClienteIdChange(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((id) => (
                  <MenuItem key={id} value={id}>
                    Cliente {id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={() => onBuscarExtrato(clienteId)}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Buscar Extrato'}
            </Button>
          </Box>
        </Paper>

        {mensagem && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Nova transação detectada para o Cliente {mensagem.clienteId}!
            Extrato atualizado automaticamente.
          </Alert>
        )}

        {erro && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {erro}
          </Alert>
        )}

        {extrato && (
          <>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Saldo Atual
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">
                    <strong>Saldo:</strong>
                  </Typography>
                  <Typography variant="h6" color={extrato.saldo.total >= 0 ? 'success.main' : 'error.main'}>
                    {formatarValor(extrato.saldo.total)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">
                    <strong>Limite:</strong>
                  </Typography>
                  <Typography variant="body1">
                    {formatarValor(extrato.saldo.limite)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Data/Hora:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatarData(extrato.saldo.data_extrato)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Paper elevation={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Últimas Transações
                </Typography>
              </Box>
              
              {extrato.ultimas_transacoes.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    Nenhuma transação encontrada
                  </Typography>
                </Box>
              ) : (
                <TableContainer>
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
                      {extrato.ultimas_transacoes.map((transacao, index) => (
                        <TableRow key={index}>
                          <TableCell>{formatarValor(transacao.valor)}</TableCell>
                          <TableCell>
                            <Chip
                              label={obterLabelTipo(transacao.tipo)}
                              color={obterCorTipo(transacao.tipo)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{transacao.descricao}</TableCell>
                          <TableCell>{formatarData(transacao.realizada_em)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ExtratoView;
