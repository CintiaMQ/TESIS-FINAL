const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

// Crear un nuevo test
router.post('/', testController.createTest);

// Obtener todos los tests
router.get('/', testController.getTests);

// Obtener un test por ID
router.get('/:id', testController.getTestById);

// Actualizar un test por ID
router.put('/:id', testController.updateTestById);

// Eliminar un test por ID
router.delete('/:id', testController.deleteTestById);

module.exports = router;
