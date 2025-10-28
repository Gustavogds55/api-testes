# 🧠 Backend de Testes de API

API **CRUD completa** em **Node.js + Express** para praticar **validações, testes automatizados e performance**.

## 🚀 Como rodar

```bash
npm install
npm run dev
```

A API ficará disponível em: `http://localhost:3000`

## 📋 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/users` | Listar todos os usuários |
| GET | `/api/users/:id` | Buscar usuário por ID |
| POST | `/api/users` | Criar usuário |
| PUT | `/api/users/:id` | Atualizar usuário |
| DELETE | `/api/users/:id` | Deletar usuário |
| DELETE | `/api/users` | Limpar todos os usuários |

## ⚙️ Testes

### Testes Unitários
```bash
npm test
```

### Testes de Performance
```bash
# Newman (Postman CLI)
newman run postman-collection.json -e newman-environment.json

# Apache Bench
ab -n 100 -c 10 http://localhost:3000/api/users

# K6
k6 run k6-test.js

# Relatório HTML
newman run postman-collection.json -e newman-environment.json --reporters html --reporter-html-export report.html
```

## 📊 Performance

**Métricas validadas:**
- **71 req/sec** de throughput
- **3ms** de tempo médio de resposta  
- **0%** de taxa de erro
- **Classificação: EXCELENTE** 🏆

## 📁 Documentação

- **Swagger**: `swagger.yaml`
- **Postman**: `postman-collection.json`
- **Insomnia**: `insomnia-collection.json`
- **Status**: `STATUS_PROJETO.md`

## 🤖 Automação

Esta API é ideal para:
- Testes de carga e performance
- Automação de QA
- Integração contínua (CI/CD)
- Scripts de monitoramento
- Treinamento em ferramentas de teste

**Ferramentas suportadas:**
- Newman (Postman CLI)
- Apache Bench
- K6
- JMeter
- Artillery
- Curl/Scripts personalizados