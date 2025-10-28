import http from 'k6/http';
import { check, sleep } from 'k6';

// Configuração do teste
export const options = {
  stages: [
    { duration: '10s', target: 5 },   // Subir para 5 usuários em 10s
    { duration: '30s', target: 5 },   // Manter 5 usuários por 30s
    { duration: '10s', target: 10 },  // Subir para 10 usuários em 10s
    { duration: '30s', target: 10 },  // Manter 10 usuários por 30s
    { duration: '10s', target: 0 },   // Reduzir para 0 em 10s
  ],
  thresholds: {
    http_req_duration: ['p(95)<100'], // 95% das requisições < 100ms
    http_req_failed: ['rate<0.1'],    // Taxa de erro < 10%
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // 1. Health Check
  let response = http.get(`${BASE_URL}/`);
  check(response, {
    'health check status 200': (r) => r.status === 200,
  });

  // 2. Listar usuários
  response = http.get(`${BASE_URL}/api/users`);
  check(response, {
    'list users status 200': (r) => r.status === 200,
  });

  // 3. Criar usuário
  const payload = JSON.stringify({
    name: `User ${Math.random()}`,
    email: `user${Math.random()}@test.com`,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  response = http.post(`${BASE_URL}/api/users`, payload, params);
  check(response, {
    'create user status 201': (r) => r.status === 201,
  });

  const userId = response.json('data.id');

  // 4. Buscar usuário criado
  if (userId) {
    response = http.get(`${BASE_URL}/api/users/${userId}`);
    check(response, {
      'get user status 200': (r) => r.status === 200,
    });

    // 5. Deletar usuário
    response = http.del(`${BASE_URL}/api/users/${userId}`);
    check(response, {
      'delete user status 200': (r) => r.status === 200,
    });
  }

  sleep(1); // Pausa de 1 segundo entre iterações
}