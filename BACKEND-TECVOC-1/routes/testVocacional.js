const express = require('express');
const router = express.Router();
const Pregunta = require('../models/Pregunta');
const Resultado = require('../models/Resultado');

// Definición de intereses y carreras
const intereses = {
    "1": "Tecnología y Diseño de Software",
    "2": "Manejo de datos, Tecnología y Manejo de información",
    "3": "Desarrollo industrial, Gestión industrial",
    "4": "Mantenimiento industrial y Sistema electrónico",
    "5": "Interés en el diseño, Creatividad de diseño",
    "6": "Interés en aplicaciones y plataformas",
    "7": "Interés en videojuegos y realidad virtual",
    "8": "Interés en las aeronaves, Mecánica",
    "9": "Interés en la Minería, Procesamiento de recursos mineros",
    "10": "Interés en redes y dispositivos de comunicación",
    "11": "Interés en los procesos químicos, En las plantas industriales",
    "12": "Interés en la mecánica o En maquinaria pesada",
    "13": "Interés en implementación de nuevas tecnologías"
};

const carreras = [
    { nombre: "Big Data y Ciencia de Datos", intereses: [2, 3, 13] },
    { nombre: "Diseño y Desarrollo de Software", intereses: [1, 5, 6, 13] },
    { nombre: "Diseño y Desarrollo de Simuladores y Videojuegos", intereses: [5, 6, 7] },
    { nombre: "Administración de Redes y Comunicaciones", intereses: [6, 10] },
    { nombre: "Producción y Gestión Industrial", intereses: [3, 4] },
    { nombre: "Diseño Industrial", intereses: [5, 13] },
    { nombre: "Electrónica y Automatización Industrial", intereses: [4, 6, 13] },
    { nombre: "Electricidad Industrial con mención en Sistemas Eléctricos de Potencia", intereses: [4, 10, 13] },
    { nombre: "Mecatrónica Industrial", intereses: [3, 4, 5, 13] },
    { nombre: "Aviónica y Mecánica Aeronáutica", intereses: [7, 8, 12] },
    { nombre: "Gestión y Mantenimiento de Maquinaria Industrial", intereses: [3, 4, 12, 13] },
    { nombre: "Gestión y Mantenimiento de Maquinaria Pesada", intereses: [3, 4, 9, 12] },
    { nombre: "Operaciones Mineras", intereses: [9, 11] },
    { nombre: "Procesos Químicos y Metalúrgicos", intereses: [9, 11] }
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
            puntuaciones[carrera.nombre] = 0;
        });

        // Calcular puntuaciones
        for (const respuesta of respuestas) {
            const pregunta = await Pregunta.findOne({ id: Number(respuesta.preguntaId) });
            if (pregunta) {
                carreras.forEach(carrera => {
                    if (carrera.intereses.includes(pregunta.interes)) {
                        puntuaciones[carrera.nombre] += respuesta.valor;
                    }
                });
            }
        }

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
