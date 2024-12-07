const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        // Establecer conexión sin las opciones obsoletas
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'test',
        });
        console.log('Conexión exitosa');

        

        // Mostrar detalles de la base de datos conectada
        console.log(`Base de datos activa: ${mongoose.connection.name}`);
        console.log(`Host: ${mongoose.connection.host}`);
        console.log(`Puerto: ${mongoose.connection.port}`);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
};

module.exports = {
    getConnection,
};
