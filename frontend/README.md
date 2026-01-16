# Frontend - React Application

Frontend da aplicação desenvolvido em React com Material-UI.

## 🛠️ Tecnologias

- React 19
- Material-UI (MUI)
- React Router DOM
- Axios
- BroadcastChannel API

## 📁 Estrutura

```
frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── componets/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Transacoes.js    # Página de criação de transações
│   │   ├── Extrato.js        # Página de visualização de extrato
│   │   ├── home.js
│   │   └── about.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── Dockerfile
└── package.json
```

## 🚀 Executar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Comandos

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test
```

A aplicação estará disponível em `http://localhost:3000`

## 🐳 Executar com Docker

```bash
# Build
docker build -t desafio-frontend .

# Run
docker run -p 3000:3000 desafio-frontend
```

## 🎯 Funcionalidades

### Rota `/transacoes`
- Formulário para criar transações
- Seleção de cliente
- Gerador de valores aleatórios
- Envia mensagem para outras abas via BroadcastChannel
- Exibe resultado da transação

### Rota `/extrato`
- Escuta mensagens de outras abas
- Busca extrato automaticamente quando recebe mensagem
- Exibe saldo, limite e últimas 10 transações
- Tabela formatada com Material-UI

## 🔄 Comunicação entre Abas

Utiliza **BroadcastChannel API** para comunicação:

1. Aba de transações envia mensagem após criar transação
2. Aba de extrato recebe mensagem e busca dados atualizados
3. Extrato é exibido automaticamente

**Para testar:**
- Abra `/transacoes` em uma aba
- Abra `/extrato` em outra aba
- Crie uma transação
- Veja o extrato atualizar automaticamente

## ⚙️ Configurações

### Variáveis de Ambiente

Crie um arquivo `.env` (opcional):

```env
REACT_APP_API_URL=http://localhost:9999
```

## 📦 Dependências Principais

```json
{
  "@mui/material": "^5.14.20",
  "@mui/icons-material": "^5.14.19",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "axios": "^1.6.2",
  "react": "^19.2.3",
  "react-router-dom": "^7.12.0"
}
```

## 🎨 Tema

A aplicação usa um tema customizado do Material-UI configurado em `App.js`:

```javascript
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});
```
