// models/Pregunta.js
const mongoose = require('mongoose');

const opcionSchema = new mongoose.Schema({
    texto: String,
    valor: Number
});

const preguntaSchema = new mongoose.Schema({
    texto: String,
    opciones: [opcionSchema]
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);
module.exports = Pregunta;
