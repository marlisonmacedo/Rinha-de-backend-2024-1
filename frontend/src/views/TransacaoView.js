import React from 'react';
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

/**
 * View - Componente de apresentação para Transações
 * Camada de View na arquitetura MVC
 */

const TransacaoView = ({
  clienteId,
  valor,
  tipo,
  descricao,
  loading,
  resultado,
  erro,
  onClienteIdChange,
  onValorChange,
  onTipoChange,
  onDescricaoChange,
  onGerarAleatorio,
  onEnviarTransacao
}) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Criar Transação
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth sx={{ mb: 2 }}>
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

            <TextField
              fullWidth
              label="Valor"
              type="number"
              value={valor}
              onChange={(e) => onValorChange(e.target.value)}
              sx={{ mb: 2 }}
              helperText="Valor em centavos"
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={tipo}
                label="Tipo"
                onChange={(e) => onTipoChange(e.target.value)}
              >
                <MenuItem value="r">Recebimento (r)</MenuItem>
                <MenuItem value="d">Débito (d)</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Descrição"
              value={descricao}
              onChange={(e) => onDescricaoChange(e.target.value)}
              sx={{ mb: 2 }}
              inputProps={{ maxLength: 10 }}
              helperText={`${descricao.length}/10 caracteres`}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                onClick={onGerarAleatorio}
                fullWidth
                disabled={loading}
              >
                Gerar Transação Aleatória
              </Button>
              
              <Button
                variant="contained"
                onClick={onEnviarTransacao}
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Enviar Transação'}
              </Button>
            </Box>

            {erro && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {erro}
              </Alert>
            )}

            {resultado && (
              <Card sx={{ bgcolor: 'success.light' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    ✅ Transação realizada com sucesso!
                  </Typography>
                  <Typography variant="body1">
                    <strong>Limite:</strong> {resultado.limite / 100} BRL
                  </Typography>
                  <Typography variant="body1">
                    <strong>Novo Saldo:</strong> {resultado.saldo / 100} BRL
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default TransacaoView;
