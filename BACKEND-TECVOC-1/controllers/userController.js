const User = require('../models/User');



// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    Object.assign(user, req.body);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const query = {};
    if (req.query.createdAt_gte) {
      query.createdAt = { $gte: new Date(req.query.createdAt_gte) };
    }
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    console.log(`Attempting to delete user with ID: ${req.params.id}`);
    const user = await User.findById(req.params.id);

    if (!user) {
      console.log(`User with ID: ${req.params.id} not found`);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.deleteOne();
    console.log(`User with ID: ${req.params.id} successfully deleted`);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error(`Error deleting user with ID: ${req.params.id}`, err);
    res.status(500).json({ message: err.message });
  }
};

// Obtener usuarios registrados en la última semana
exports.getUsersRegisteredLastWeek = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const users = await User.find({ createdAt: { $gte: oneWeekAgo } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener usuarios registrados en el último mes
exports.getUsersRegisteredLastMonth = async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const users = await User.find({ createdAt: { $gte: oneMonthAgo } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
