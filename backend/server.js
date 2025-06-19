const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/databse');

const config = require('./config');

const startServer = async () => {
    try {
        await connectDB();

        // Servidor HTTP
        const server = http.createServer(app);

        server.listen(config.PORT, ()=>{
            console.log(`Server running at port: ${config.PORT}`);
            console.log('ENV: ', config.NODE_ENV);
            console.log('CORS ORIGIN: ', config.CORS_ORIGIN);
        })
    } catch(error) {
        console.log('[ERROR] Error starting the server.', error);
        process.exit(1);
    }
}

startServer();