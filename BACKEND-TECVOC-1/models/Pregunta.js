const mongoose = require('mongoose');

const OpcionSchema = new mongoose.Schema({
    texto: String,
    valor: Number,
});

const PreguntaSchema = new mongoose.Schema({
    id: Number,
    texto: String,
    interes: Number,
    opciones: [OpcionSchema],
});

const Pregunta = mongoose.model('Pregunta', PreguntaSchema);

module.exports = Pregunta;
