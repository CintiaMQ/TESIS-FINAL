// models/Resultado.js
const mongoose = require('mongoose');

const resultadoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    puntuaciones: {
        type: Map,
        of: Number,
        required: true,
    },
    resultado: {
        type: [String], // Guardar las tres mejores carreras
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
});

const Resultado = mongoose.model('Resultado', resultadoSchema);
module.exports = Resultado;
