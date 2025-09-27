# Banco API Tests

Automação de testes para o projeto [Banco API](https://github.com/juliodelimas/banco-api).  
O objetivo é validar os principais fluxos da API, como autenticação e transferências bancárias.

---

## Tecnologias utilizadas

- **JavaScript** → linguagem principal  
- **Mocha** → framework de testes  
- **Chai** → biblioteca de asserções  
- **Supertest** → requisições HTTP para testes de API  
- **Mochawesome** → geração de relatórios de testes em HTML/JSON  
- **Dotenv** → gerenciamento de variáveis de ambiente  

---

## Estrutura do projeto

```
banco-api-tests
├── fixtures/                   # Massa de dados para os testes
│   ├── postLogin.json
│   └── postTransferencias.json
├── helpers/                    # Funções auxiliares
│   └── autenticacao.js
├── test/                       # Testes automatizados
│   ├── login.test.js
│   └── transferencia.test.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## Pré-requisitos

- Node.js (18+)  
- NPM (ou Yarn)  

---

## Configuração do ambiente

Este repositório **não contém arquivo `.env`**.  
Crie um `.env` na raiz do projeto com a seguinte variável:

```env
BASE_URL=http://localhost:3000
```

> Por padrão, a aplicação [Banco API](https://github.com/juliodelimas/banco-api) roda na porta **3000**.

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/vasconcelosar9/banco-api-tests.git
cd banco-api-tests
npm install
```

---

## Execução dos testes

Rodar todos os testes com relatório Mochawesome:

```bash
npm test
```

O relatório será gerado em:

```
/mochawesome-report/mochawesome.html
```

---

## Casos de teste implementados

### Login
- **POST /login**
  - Retorna **200** e token em formato `string` com credenciais válidas.

### Transferências
- **POST /transferencias**
  - Retorna **201** quando valor ≥ R$10,00.  
  - Retorna **422** quando valor < R$10,00.  

- **GET /transferencias/{id}**
  - Retorna **200** com dados consistentes ao registro no banco.  

- **GET /transferencias**
  - Retorna **200** e respeita paginação (10 registros por página).  

---

## Observações

- É necessário que a aplicação **Banco API** esteja rodando antes de executar os testes.  
- As massas de dados para login e transferências estão em `/fixtures`.  
- O helper `autenticacao.js` é responsável por obter o token de acesso.  
