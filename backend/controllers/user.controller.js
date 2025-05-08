const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function getAllUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

async function createUser(req, res) {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });
  res.status(201).json(user);
}

async function updateUser(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
}

async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Utilisateur supprimé' });
}

module.exports = { getAllUsers, updateUser, deleteUser, createUser };
