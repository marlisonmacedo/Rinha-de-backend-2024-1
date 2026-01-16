# Guia de Teste - Rinha de Backend 2024/1

## 🧪 Como Testar a Aplicação

### Teste Manual da Comunicação entre Abas

1. **Inicie a aplicação**:
   ```bash
   docker-compose up --build
   ```

2. **Abra duas abas do navegador**:
   - Aba 1: http://localhost:3000/transacoes
   - Aba 2: http://localhost:3000/extrato

3. **Na aba de Transações**:
   - Selecione um cliente (por exemplo, Cliente 1)
   - Clique em "Gerar Valores Aleatórios" (opcional)
   - Ou preencha manualmente:
     - Valor: 1000 (centavos = R$ 10,00)
     - Tipo: r (recebível)
     - Descrição: teste
   - Clique em "Enviar Transação"

4. **Observe a aba de Extrato**:
   - Automaticamente receberá a notificação
   - Buscará e exibirá o extrato atualizado
   - Mostrará o saldo, limite e a transação recém-criada

### Teste da API Diretamente

#### 1. Criar uma Transação

```bash
curl -X POST http://localhost:9999/clientes/1/transacoes \
  -H "Content-Type: application/json" \
  -d '{
    "valor": 1000,
    "tipo": "r",
    "descricao": "teste"
  }'
```

**Resposta esperada (200 OK)**:
```json
{
  "limite": 100000,
  "saldo": 1000
}
```

#### 2. Obter Extrato

```bash
curl http://localhost:9999/clientes/1/extrato
```

**Resposta esperada (200 OK)**:
```json
{
  "saldo": {
    "total": 1000,
    "dataExtrato": "2026-01-15T...",
    "limite": 100000
  },
  "ultimasTransacoes": [
    {
      "valor": 1000,
      "tipo": "r",
      "descricao": "teste",
      "realizadaEm": "2026-01-15T..."
    }
  ]
}
```

#### 3. Testar Cliente Inexistente (deve retornar 404)

```bash
curl -i http://localhost:9999/clientes/6/extrato
```

**Resposta esperada**: `HTTP/1.1 404 Not Found`

#### 4. Testar Saldo Insuficiente (deve retornar 422)

```bash
# Primeiro, criar cliente com limite baixo
curl -X POST http://localhost:9999/clientes/1/transacoes \
  -H "Content-Type: application/json" \
  -d '{
    "valor": 200000,
    "tipo": "d",
    "descricao": "debito"
  }'
```

**Resposta esperada**: `HTTP/1.1 422 Unprocessable Entity`

#### 5. Testar Validação de Descrição (deve retornar 422)

```bash
curl -i -X POST http://localhost:9999/clientes/1/transacoes \
  -H "Content-Type: application/json" \
  -d '{
    "valor": 1000,
    "tipo": "r",
    "descricao": "descricao muito longa"
  }'
```

**Resposta esperada**: `HTTP/1.1 422 Unprocessable Entity`

### Teste de Carga com Gatling

1. **Certifique-se de que o Gatling está instalado**:
   - Download: https://gatling.io/open-source/
   - Configure GATLING_HOME

2. **Baixe os arquivos de teste do repositório do desafio**:
   ```bash
   git clone https://github.com/marlisonmacedo/Rinha-de-backend-2024-1.git temp-test
   cp -r temp-test/load-test ./
   rm -rf temp-test
   ```

3. **Execute o teste**:
   
   **Linux/Mac**:
   ```bash
   chmod +x executar-teste-local.sh
   ./executar-teste-local.sh
   ```
   
   **Windows**:
   ```powershell
   ./executar-teste-local.ps1
   ```

4. **Analise os resultados**:
   - Os relatórios são salvos em `./load-test/user-files/results`
   - Abra o arquivo `index.html` do resultado mais recente

### Verificar Load Balancer (Nginx)

1. **Fazer múltiplas requisições e verificar distribuição**:
   ```bash
   for i in {1..10}; do
     curl http://localhost:9999/clientes/1/extrato
     echo ""
   done
   ```

2. **Verificar logs das APIs**:
   ```bash
   # API 1
   docker-compose logs api01
   
   # API 2
   docker-compose logs api02
   ```

   Você deve ver requisições sendo distribuídas entre ambas as instâncias.

### Verificar Banco de Dados

1. **Conectar ao PostgreSQL**:
   ```bash
   docker exec -it <container-id-postgres> psql -U admin -d rinha
   ```

2. **Consultar clientes**:
   ```sql
   SELECT * FROM clientes;
   ```

3. **Consultar transações**:
   ```sql
   SELECT * FROM transacoes ORDER BY realizada_em DESC LIMIT 10;
   ```

### Teste de Concorrência

Execute múltiplas transações simultâneas:

```bash
# Terminal 1
curl -X POST http://localhost:9999/clientes/1/transacoes \
  -H "Content-Type: application/json" \
  -d '{"valor": 500, "tipo": "r", "descricao": "teste1"}' &

# Terminal 2
curl -X POST http://localhost:9999/clientes/1/transacoes \
  -H "Content-Type: application/json" \
  -d '{"valor": 300, "tipo": "d", "descricao": "teste2"}' &

# Terminal 3
curl -X POST http://localhost:9999/clientes/1/transacoes \
  -H "Content-Type: application/json" \
  -d '{"valor": 200, "tipo": "r", "descricao": "teste3"}' &
```

Depois verifique o saldo:
```bash
curl http://localhost:9999/clientes/1/extrato | jq '.saldo.total'
```

### Monitorar Recursos Docker

```bash
docker stats
```

Verifique se os limites de CPU e memória estão sendo respeitados:
- Total CPU: ≤ 1.5
- Total Memory: ≤ 550MB

## ✅ Checklist de Testes

- [ ] Frontend carrega corretamente
- [ ] Navegação entre rotas funciona
- [ ] Criação de transação via interface
- [ ] Mensagem entre abas funciona
- [ ] Extrato é atualizado automaticamente
- [ ] API retorna 200 para transações válidas
- [ ] API retorna 404 para cliente inexistente
- [ ] API retorna 422 para saldo insuficiente
- [ ] API retorna 422 para dados inválidos
- [ ] Load balancer distribui requisições
- [ ] Banco de dados persiste transações
- [ ] Limites de recursos são respeitados
- [ ] Teste de carga Gatling executa (se disponível)

## 🐛 Problemas Comuns

### Erro: "Cannot connect to database"
- Aguarde alguns segundos para o PostgreSQL inicializar
- Verifique logs: `docker-compose logs db`

### Erro: "Port already in use"
- Pare outros serviços usando as portas 3000, 5432, 8081, 8082, 9999
- Ou modifique as portas no `docker-compose.yml`

### Erro: "BroadcastChannel not defined"
- Use um navegador moderno (Chrome, Firefox, Edge)
- Não funciona em modo privado/anônimo em alguns navegadores

### Frontend não atualiza automaticamente
- Certifique-se de abrir `/transacoes` e `/extrato` em abas separadas
- Verifique o console do navegador para erros
- Teste em abas normais (não privadas)

## 📊 Métricas Esperadas

Com o teste de carga Gatling:
- Todas as transações válidas devem retornar 200
- Requisições para cliente ID 6 devem retornar 404
- Saldos devem permanecer consistentes
- Não deve haver race conditions (saldos negativos além do limite)
