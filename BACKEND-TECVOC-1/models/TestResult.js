const mongoose = require('mongoose');

const RespuestaSchema = new mongoose.Schema({
  preguntaId: Number,
  respuesta: String
});

const TestSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  cuestionario: { type: mongoose.Schema.Types.ObjectId, ref: 'Cuestionario' },
  respuestas: [RespuestaSchema],
  puntajeTotal: Number,
  carreraRecomendada: String,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Test', TestSchema);
