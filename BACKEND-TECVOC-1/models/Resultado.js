const mongoose = require('mongoose');

const ResultadoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    puntuaciones: { type: Map, of: Number },
    resultado: [String],
    fecha: { type: Date, default: Date.now }
});

const Resultado = mongoose.model('Resultado', ResultadoSchema);

module.exports = Resultado;
