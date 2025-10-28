#!/bin/bash

echo "🚀 Iniciando testes de performance..."

# Limpar dados antes do teste
curl -X DELETE http://localhost:3000/api/users

echo "📊 Teste 1: Health Check"
ab -n 100 -c 10 http://localhost:3000/

echo "📊 Teste 2: Listar usuários (vazio)"
ab -n 100 -c 10 http://localhost:3000/api/users

echo "📊 Teste 3: Criar usuários"
ab -n 50 -c 5 -T "application/json" -p user.json http://localhost:3000/api/users

echo "📊 Teste 4: Listar usuários (com dados)"
ab -n 100 -c 10 http://localhost:3000/api/users

echo "✅ Testes concluídos!"