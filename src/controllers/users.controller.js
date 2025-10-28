import * as userData from "../data/users.js";

export const getAllUsers = (req, res) => {
  const users = userData.getAllUsers();
  return res.json({ data: users, total: users.length });
};

export const getUserById = (req, res) => {
  const user = userData.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  return res.json({ data: user });
};

export const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = userData.createUser({ name, email });
  return res.status(201).json({ message: "Usuário criado com sucesso!", data: newUser });
};

export const updateUser = (req, res) => {
  const { name, email } = req.body;
  const updatedUser = userData.updateUser(req.params.id, { name, email });
  if (!updatedUser) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  return res.json({ message: "Usuário atualizado com sucesso!", data: updatedUser });
};

export const deleteUser = (req, res) => {
  const deletedUser = userData.deleteUser(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  return res.json({ message: "Usuário deletado com sucesso!", data: deletedUser });
};

export const clearAllUsers = (req, res) => {
  userData.clearUsers();
  return res.json({ message: "Todos os usuários foram removidos!" });
};
