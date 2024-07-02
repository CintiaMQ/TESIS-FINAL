const express = require('express');
const router = express.Router();
const Pregunta = require('../models/Pregunta');
const Resultado = require('../models/Resultado');

const carreras = [
    "Administración de Redes y Comunicaciones",
    "Big Data y Ciencia de Datos",
    "Aviónica y Mecánica Aeronáutica",
    "Diseño y desarrollo de software",
    "Diseño y Desarrollo de Simuladores y Videojuegos",
    "Gestión y Mantenimiento de Maquinaria Industrial",
    "Gestión y Mantenimiento de Maquinaria Pesada",
    "Operaciones Mineras",
    "Procesos Químicos y Metalúrgicos",
    "Diseño Industrial",
    "Producción y Gestión Industrial",
    "Electrónica y Automatización Industrial",
    "Electricidad Industrial con mención en Sistemas Eléctricos de Potencia",
    "Mecatrónica Industrial"
];

// Obtener todas las preguntas
router.get('/preguntas', async (req, res) => {
    try {
        const preguntas = await Pregunta.find();
        if (!preguntas || preguntas.length === 0) {
            console.log('Error: No se encontraron preguntas');
            return res.status(404).json({ message: 'No se encontraron preguntas' });
        }
        res.json(preguntas);
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener preguntas' });
    }
});

// Enviar respuestas y calcular resultado
router.post('/resultados', async (req, res) => {
    const { email, respuestas } = req.body;

    if (!email || !respuestas || respuestas.length === 0) {
        console.log('Error: Datos de entrada inválidos');
        return res.status(400).json({ message: 'Datos de entrada inválidos' });
    }

    try {
        const puntuaciones = {};
        carreras.forEach(carrera => {
            puntuaciones[carrera] = 0;
        });

        // Calcular puntuaciones
        respuestas.forEach((respuesta) => {
            // Asumimos que cada respuesta tiene un impacto en todas las carreras
            carreras.forEach(carrera => {
                // Aquí deberías implementar una lógica más compleja basada en tus requisitos específicos
                // Por ahora, simplemente sumamos el valor de cada respuesta a todas las carreras
                puntuaciones[carrera] += respuesta.valor;
            });
        });

        // Ordenar carreras por puntuación
        const carrerasOrdenadas = Object.keys(puntuaciones).sort((a, b) => puntuaciones[b] - puntuaciones[a]);

        // Tomar las tres carreras con mayor puntuación
        const resultado = carrerasOrdenadas.slice(0, 3);

        // Guardar el resultado en la base de datos
        const nuevoResultado = new Resultado({
            email,
            puntuaciones,
            resultado,
        });

        await nuevoResultado.save();
        res.json({ message: 'Resultado guardado correctamente', resultado });
    } catch (error) {
        console.error('Error al procesar resultados:', error);
        res.status(500).json({ message: 'Error interno del servidor al procesar resultados' });
    }
});

// Obtener resultados por email
router.get('/resultados/:email', async (req, res) => {
    const { email } = req.params;
    if (!email) {
        console.log('Error: Email no proporcionado');
        return res.status(400).json({ message: 'Email no proporcionado' });
    }

    try {
        const resultados = await Resultado.find({ email }).sort({ fecha: -1 });
        if (!resultados || resultados.length === 0) {
            console.log('Error: No se encontraron resultados para el email proporcionado');
            return res.status(404).json({ message: 'No se encontraron resultados para el email proporcionado' });
        }
        res.json(resultados);
    } catch (error) {
        console.error('Error al obtener resultados:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener resultados' });
    }
});

module.exports = router;
