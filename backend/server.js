const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/databse');

const config = require('./config');

const startServer = async () => {
    try {
        await connectDB();

        server.listen(config.PORT, ()=>{
            console.log(`Server running at port: ${config.PORT}`);
            console.log('Datos de las variables de entorno: ', config.NODE_ENV);
            console.log('Cors origin: ', config.CORS_ORIGIN);
        })
    } catch(error) {
        console.log('[ERROR] Error starting the server.', error);
        process.exit(1);
    }
}

startServer();