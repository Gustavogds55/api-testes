let users = [];
let nextId = 1;

export const getAllUsers = () => users;

export const getUserById = (id) => users.find(user => user.id === parseInt(id));

export const createUser = (userData) => {
  const user = { id: nextId++, ...userData, createdAt: new Date().toISOString() };
  users.push(user);
  return user;
};

export const updateUser = (id, userData) => {
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index === -1) return null;
  users[index] = { ...users[index], ...userData, updatedAt: new Date().toISOString() };
  return users[index];
};

export const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index === -1) return null;
  return users.splice(index, 1)[0];
};

export const clearUsers = () => {
  users = [];
  nextId = 1;
};