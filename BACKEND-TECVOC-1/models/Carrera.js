// models/Carrera.js
const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  }
});

const Carrera = mongoose.model('Carrera', carreraSchema);
module.exports = Carrera;
