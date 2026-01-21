# Arquitetura MVC do Projeto

Este projeto foi reorganizado seguindo o padrão **MVC (Model-View-Controller)** tanto no backend quanto no frontend.

## 📁 Estrutura do Projeto

### Backend (Java/Spring Boot)

```
backend/src/main/java/com/rinha/desafio/
├── controller/           # CONTROLLER - Recebe requisições HTTP
│   └── ClienteController.java
├── model/               # MODEL - Entidades de domínio
│   ├── Cliente.java
│   └── Transacao.java
├── service/             # MODEL - Lógica de negócio
│   └── ClienteService.java
├── repository/          # MODEL - Acesso a dados
│   ├── ClienteRepository.java
│   └── TransacaoRepository.java
├── view/                # VIEW - Formatação de respostas
│   └── ClienteView.java
└── dto/                 # Data Transfer Objects
    ├── ExtratoResponse.java
    ├── TransacaoRequest.java
    └── TransacaoResponse.java
```

#### Responsabilidades

**Controller (`ClienteController.java`)**
- Recebe requisições HTTP
- Valida entrada básica
- Coordena entre Service (Model) e View
- Trata exceções

**Model (`service/`, `model/`, `repository/`)**
- `ClienteService.java`: Lógica de negócio (validações, cálculos)
- `Cliente.java` e `Transacao.java`: Entidades de domínio
- Repositories: Acesso ao banco de dados

**View (`ClienteView.java`)**
- Formata respostas HTTP
- Define códigos de status
- Prepara dados para apresentação

### Frontend (React)

```
frontend/src/
├── models/              # MODEL - Lógica de negócio e dados
│   ├── TransacaoModel.js
│   └── ExtratoModel.js
├── controllers/         # CONTROLLER - Gerenciamento de estado
│   ├── TransacaoController.js
│   └── ExtratoController.js
├── views/               # VIEW - Componentes de apresentação
│   ├── TransacaoView.js
│   └── ExtratoView.js
├── pages/               # Integração MVC
│   ├── Transacoes.js
│   ├── Extrato.js
│   ├── home.js
│   └── about.js
├── components/          # Componentes compartilhados
│   ├── Navbar.js
│   └── NavBar.css
└── hooks/               # Custom hooks utilitários
    └── useFetch.js
```

#### Responsabilidades

**Model (`models/`)**
- Comunicação com API (axios)
- Lógica de negócio (validações, cálculos)
- Formatação de dados
- Tratamento de erros

**Controller (`controllers/`)**
- Gerenciamento de estado (usando hooks)
- Coordenação entre Model e View
- Lógica de controle da aplicação
- Comunicação entre componentes (BroadcastChannel)

**View (`views/`)**
- Componentes de apresentação pura
- Interface do usuário (Material-UI)
- Recebe dados via props
- Emite eventos via callbacks

## 🔄 Fluxo de Dados

### Backend
```
HTTP Request → Controller → Service (Model) → Repository (Model) → Database
                    ↓              ↑
                   View     (Processa e valida)
                    ↓
               HTTP Response
```

### Frontend
```
User Action → View → Controller → Model → API
                ↓         ↑          ↑
            Callbacks   Estado   Resposta
                ↓         ↓
              View atualizada
```

## 📝 Exemplo de Uso

### Backend - Criar Transação

1. **Controller** recebe a requisição POST `/clientes/{id}/transacoes`
2. **Service (Model)** valida e processa a transação
3. **Repository (Model)** persiste no banco de dados
4. **View** formata a resposta HTTP com código apropriado

### Frontend - Criar Transação

1. **View** (`TransacaoView.js`) captura ação do usuário
2. **Controller** (`TransacaoController.js`) gerencia o estado
3. **Model** (`TransacaoModel.js`) comunica com API e valida dados
4. **Controller** atualiza estado com resultado
5. **View** renderiza nova interface com feedback

## 🎯 Benefícios da Arquitetura MVC

✅ **Separação de responsabilidades**: Cada camada tem um propósito específico

✅ **Manutenibilidade**: Fácil localizar e modificar funcionalidades

✅ **Testabilidade**: Cada camada pode ser testada independentemente

✅ **Reutilização**: Models e Views podem ser reutilizados

✅ **Escalabilidade**: Adicionar novos recursos é mais organizado

## 🚀 Como Executar

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Docker Compose
```bash
docker-compose up
```

## 📚 Tecnologias

**Backend:**
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL

**Frontend:**
- React 18
- Material-UI
- Axios
- React Router

---

*Desenvolvido seguindo princípios de Clean Code e SOLID*
