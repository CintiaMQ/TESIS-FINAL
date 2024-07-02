const mongoose = require('mongoose');

const conectarMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/MiBasedeDatos', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`BD conectada`);

    } catch (error) {
        console.log(error);
        process.exit(1); //Detiene la app
    }
}


module.exports = conectarMongoDB;

// const mongoose = require('mongoose');

// const conectarMongoDB = async () => {
//   try {
//     const mongoURI = 'mongodb://127.0.0.1:27017/MiBasedeDatos';

//     if (!mongoURI) {
//       console.error('No MongoDB URI specified in .env file');
//       process.exit(1);
//     }

//     const conn = await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 30000, // Aumenta el tiempo de espera a 30 segundos
//     });

//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Error al conectar a MongoDB:', error);
//     throw error;
//   }
// };

// module.exports = conectarMongoDB;
