import request from "supertest";
import app from "../src/app.js";

describe("API de usuários - CRUD completo", () => {
  beforeEach(async () => {
    // Limpa dados antes de cada teste
    await request(app).delete("/api/users");
  });

  describe("POST /api/users", () => {
    it("Deve criar um usuário com sucesso", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Gustavo", email: "teste@email.com" });
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("createdAt");
    });

    it("Deve retornar erro ao enviar dados inválidos", async () => {
      const res = await request(app).post("/api/users").send({ name: "" });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("GET /api/users", () => {
    it("Deve listar todos os usuários", async () => {
      await request(app).post("/api/users").send({ name: "User1", email: "user1@test.com" });
      await request(app).post("/api/users").send({ name: "User2", email: "user2@test.com" });
      
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveLength(2);
      expect(res.body.total).toEqual(2);
    });
  });

  describe("GET /api/users/:id", () => {
    it("Deve buscar usuário por ID", async () => {
      const createRes = await request(app).post("/api/users").send({ name: "Test", email: "test@test.com" });
      const userId = createRes.body.data.id;
      
      const res = await request(app).get(`/api/users/${userId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toEqual("Test");
    });

    it("Deve retornar 404 para ID inexistente", async () => {
      const res = await request(app).get("/api/users/999");
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("PUT /api/users/:id", () => {
    it("Deve atualizar usuário", async () => {
      const createRes = await request(app).post("/api/users").send({ name: "Old", email: "old@test.com" });
      const userId = createRes.body.data.id;
      
      const res = await request(app)
        .put(`/api/users/${userId}`)
        .send({ name: "New", email: "new@test.com" });
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toEqual("New");
      expect(res.body.data).toHaveProperty("updatedAt");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("Deve deletar usuário", async () => {
      const createRes = await request(app).post("/api/users").send({ name: "Delete", email: "delete@test.com" });
      const userId = createRes.body.data.id;
      
      const res = await request(app).delete(`/api/users/${userId}`);
      expect(res.statusCode).toEqual(200);
      
      const getRes = await request(app).get(`/api/users/${userId}`);
      expect(getRes.statusCode).toEqual(404);
    });
  });
});
