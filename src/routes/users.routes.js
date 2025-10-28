import express from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, clearAllUsers } from "../controllers/users.controller.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

const validateUser = [
  body("name").notEmpty().withMessage("O nome é obrigatório"),
  body("email").isEmail().withMessage("E-mail inválido"),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /api/users - Listar todos
router.get("/", getAllUsers);

// GET /api/users/:id - Buscar por ID
router.get("/:id", getUserById);

// POST /api/users - Criar usuário
router.post("/", validateUser, handleValidation, createUser);

// PUT /api/users/:id - Atualizar usuário
router.put("/:id", validateUser, handleValidation, updateUser);

// DELETE /api/users/:id - Deletar usuário
router.delete("/:id", deleteUser);

// DELETE /api/users - Limpar todos (para testes)
router.delete("/", clearAllUsers);

export default router;
