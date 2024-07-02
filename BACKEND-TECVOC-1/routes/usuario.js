const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Crear un nuevo usuario
router.post('/register', userController.createUser);

// Actualizar un usuario por ID
router.put('/:id', userController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id', userController.deleteUser);

// Obtener usuarios registrados en la última semana
router.get('/recent/week', userController.getUsersRegisteredLastWeek);

// Obtener usuarios registrados en el último mes
router.get('/recent/month', userController.getUsersRegisteredLastMonth);

module.exports = router;
