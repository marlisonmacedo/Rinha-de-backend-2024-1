# Rinha de Backend 2024/1

> Projeto Full Stack desenvolvido para demonstrar habilidades em desenvolvimento backend com foco em performance, concorrência e escalabilidade.

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como parte do meu portfólio profissional, inspirado na Rinha de Backend - um desafio técnico que testa a capacidade de desenvolver APIs resilientes sob alta concorrência.

A aplicação simula um sistema de controle de transações bancárias com controle de saldo e limite, implementando:

- **Backend**: API REST em Java com Spring Boot
- **Frontend**: Interface React com Material-UI
- **Banco de Dados**: PostgreSQL com controle transacional
- **Load Balancer**: Nginx para distribuição de carga
- **Infraestrutura**: Docker Compose para orquestração completa

## 🎯 Principais Características

- ✅ API RESTful seguindo boas práticas
- ✅ Controle de concorrência em transações financeiras
- ✅ Arquitetura escalável com múltiplas instâncias
- ✅ Load balancing com Nginx
- ✅ Containerização completa com Docker
- ✅ Interface responsiva para gerenciamento de transações
- ✅ Comunicação entre abas usando BroadcastChannel API

## 📋 Pré-requisitos

Para executar este projeto, você precisará ter instalado:

- Docker e Docker Compose
- (Opcional) JDK 17 e Node.js 18+ para desenvolvimento local

## 🚀 Como Executar

### Opção 1: Docker Compose (Recomendado)

```bash
# Clone o repositório
git clone <seu-repositorio>
cd react_Router

# Execute todos os serviços
docker-compose up --build
```

O Docker Compose irá:
- Construir e iniciar 2 instâncias da API Java (portas 8081 e 8082)
- Iniciar o banco de dados PostgreSQL (porta 5432)
- Configurar o Nginx como load balancer (porta 9999 para API)
- Construir e iniciar o frontend React (porta 3000)

### Opção 2: Desenvolvimento Local

Para desenvolvimento local sem Docker:

**Backend:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

### Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **API (via Load Balancer)**: http://localhost:9999
- **API Instância 1**: http://localhost:8081
- **API Instância 2**: http://localhost:8082

## 🎯 Funcionalidades

### Frontend

#### Rota `/transacoes`
- Permite criar transações para clientes
- Opção de gerar valores aleatórios
- Envia mensagem para a aba de extrato via BroadcastChannel
- Exibe resultado da transação (limite e novo saldo)

#### Rota `/extrato`
- Aguarda mensagens da aba de transações
- Busca e exibe o extrato do cliente automaticamente
- Mostra saldo total, limite e últimas 10 transações
- Formata valores e datas

### Backend

#### POST `/clientes/{id}/transacoes`
Cria uma transação para um cliente.

**Request Body:**
```json
{
  "valor": 1000,
  "tipo": "r",
  "descricao": "descricao"
}
```

**Response (200 OK):**
```json
{
  "limite": 100000,
  "saldo": 1000
}
```

#### GET `/clientes/{id}/extrato`
Retorna o extrato de um cliente.

**Response (200 OK):**
```json
{
  "saldo": {
    "total": 1000,
    "dataExtrato": "2024-01-17T02:34:41.217753Z",
    "limite": 100000
  },
  "ultimasTransacoes": [
    {
      "valor": 1000,
      "tipo": "r",
      "descricao": "descricao",
      "realizadaEm": "2024-01-17T02:34:38.543030Z"
    }
  ]
}
```

## 🗄️ Banco de Dados

Os seguintes clientes são criados automaticamente:

| ID | Limite (centavos) | Saldo Inicial |
|----|-------------------|---------------|
| 1  | 100000           | 0             |
| 2  | 80000            | 0             |
| 3  | 1000000          | 0             |
| 4  | 10000000         | 0             |
| 5  | 500000           | 0             |

⚠️ **Nota**: O cliente com ID 6 não existe propositalmente para testar o retorno 404.

## 📊 Teste de Carga com Gatling

### Pré-requisitos
1. Baixe o Gatling: https://gatling.io/open-source/
2. Configure a variável GATLING_HOME

### Executar os testes

**Linux/Mac:**
```bash
./executar-teste-local.sh
```

**Windows:**
```powershell
./executar-teste-local.ps1
```

Os resultados serão salvos em `./load-test/user-files/results`.

## 🐳 Configuração Docker

### Limites de Recursos

Conforme requisitos do desafio:

| Serviço    | CPU   | Memória |
|------------|-------|---------|
| API 01     | 0.6   | 200MB   |
| API 02     | 0.6   | 200MB   |
| Nginx      | 0.17  | 10MB    |
| PostgreSQL | 0.13  | 140MB   |
| Frontend   | 0.1   | 100MB   |
| **TOTAL**  | **1.5** | **550MB** |

## 🛠️ Desenvolvimento Local

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
cd frontend

```bash
npm start
```

## 📁 Estrutura do Projeto

```
.
├── backend/                          # Backend Java Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/com/rinha/desafio/
│   │       │   ├── controller/       # Controllers REST
│   │       │   ├── dto/              # Data Transfer Objects
│   │       │   ├── model/            # Entidades JPA
│   │       │   ├── repository/       # Repositories JPA
│   │       │   ├── service/          # Serviços de negócio
│   │       │   └── DesafioApplication.java
│   │       └── resources/
│   │           └── application.properties
│   ├── Dockerfile
│   ├── pom.xml
│   └── README.md
├── frontend/                         # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── componets/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Transacoes.js
│   │   │   ├── Extrato.js
│   │   │   ├── home.js
│   │   │   └── about.js
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── docker-compose.yml                # Orquestração dos serviços
├── nginx.conf                        # Configuração do Nginx
├── script.sql                        # Script de inicialização do BD
├── TESTING.md                        # Guia de testes
└── README.md
```

## 🔒 Regras de Negócio

1. **Transação de débito**: Nunca pode deixar o saldo menor que `-limite`
2. **Validações**:
   - Valor: inteiro positivo (em centavos)
   - Tipo: apenas 'r' (recebível) ou 'd' (débito)
   - Descrição: 1 a 10 caracteres
3. **HTTP Status Codes**:
   - 200: Transação bem-sucedida
   - 404: Cliente não encontrado
   - 422: Transação inválida ou saldo insuficiente

## 🔄 Comunicação entre Abas

O projeto usa a **BroadcastChannel API** para comunicação entre abas:

1. Quando uma transação é criada em `/transacoes`, uma mensagem é enviada
2. A aba `/extrato` recebe a mensagem automaticamente
3. O extrato é atualizado com os dados do cliente

Para testar:
1. Abra `/transacoes` em uma aba
2. Abra `/extrato` em outra aba
3. Crie uma transação na primeira aba
4. Veja o extrato ser atualizado automaticamente na segunda aba

## 📝 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Maven
- Docker

### Frontend
- React 19
- Material-UI (MUI)
- Axios
- React Router DOM
- BroadcastChannel API

### Infraestrutura
- Docker & Docker Compose
- Nginx (Load Balancer)
- PostgreSQL

## 🐛 Troubleshooting

### Porta já em uso
Se alguma porta estiver em uso, você pode modificar as portas no `docker-compose.yml`.

### Erro de conexão com o banco
Certifique-se de que o PostgreSQL está rodando corretamente:
```bash
docker-compose logs db
```

### Frontend não conecta com a API
Verifique a variável de ambiente `REACT_APP_API_URL` e certifique-se de que o Nginx está rodando na porta 9999.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Autor

**Marlison Macedo**

Desenvolvido como projeto de portfólio demonstrando competências em:
- Desenvolvimento Full Stack (Java/Spring Boot + React)
- Arquitetura de microsserviços e escalabilidade
- Containerização e orquestração com Docker
- Controle de concorrência em sistemas financeiros
- Boas práticas de desenvolvimento e versionamento

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
