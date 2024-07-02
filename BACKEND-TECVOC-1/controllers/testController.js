const Test = require('../models/TestResult');

// Crear un nuevo test
exports.createTest = async (req, res) => {
  try {
    const newTest = new Test(req.body);
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los tests
exports.getTests = async (req, res) => {
  try {
    const tests = await Test.find().populate('usuario').populate('cuestionario');
    res.status(200).json(tests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un test por ID
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('usuario').populate('cuestionario');
    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un test por ID
exports.updateTestById = async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTest) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un test por ID
exports.deleteTestById = async (req, res) => {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    if (!deletedTest) {
      return res.status(404).json({ error: 'Test not found' });
    }
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
