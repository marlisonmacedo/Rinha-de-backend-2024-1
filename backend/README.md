# Backend - API REST Java Spring Boot

Backend da aplicação desenvolvido em Java com Spring Boot.

## 🛠️ Tecnologias

- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Maven
- Docker

## 📁 Estrutura

```
backend/
├── src/
│   └── main/
│       ├── java/com/softplan/desafio/
│       │   ├── controller/      # REST Controllers
│       │   ├── dto/             # Data Transfer Objects
│       │   ├── model/           # Entidades JPA
│       │   ├── repository/      # JPA Repositories
│       │   ├── service/         # Serviços de negócio
│       │   └── DesafioApplication.java
│       └── resources/
│           └── application.properties
├── Dockerfile
└── pom.xml
```

## 🚀 Executar Localmente

### Pré-requisitos
- JDK 17
- Maven 3.9+
- PostgreSQL rodando

### Comandos

```bash
# Compilar
mvn clean install

# Executar
mvn spring-boot:run

# Executar testes
mvn test
```

A API estará disponível em `http://localhost:8080`

## 🐳 Executar com Docker

```bash
# Build
docker build -t desafio-backend .

# Run
docker run -p 8080:8080 \
  -e DB_HOSTNAME=host.docker.internal \
  desafio-backend
```

## 📡 Endpoints

### POST /clientes/{id}/transacoes
Cria uma transação para um cliente.

**Request:**
```json
{
  "valor": 1000,
  "tipo": "r",
  "descricao": "teste"
}
```

**Response (200):**
```json
{
  "limite": 100000,
  "saldo": 1000
}
```

### GET /clientes/{id}/extrato
Retorna o extrato de um cliente.

**Response (200):**
```json
{
  "saldo": {
    "total": 1000,
    "dataExtrato": "2024-01-17T02:34:41.217753Z",
    "limite": 100000
  },
  "ultimasTransacoes": [...]
}
```

## 🔒 Regras de Negócio

- Transações de débito não podem deixar saldo < -limite
- Validações:
  - Valor: inteiro positivo (centavos)
  - Tipo: 'r' (recebível) ou 'd' (débito)
  - Descrição: 1-10 caracteres
- HTTP Status:
  - 200: Sucesso
  - 404: Cliente não encontrado
  - 422: Validação falhou ou saldo insuficiente

## ⚙️ Configurações

Edite `application.properties` para configurar:
- Conexão com banco de dados
- Porta do servidor
- Propriedades do Hibernate
