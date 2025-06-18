const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/databse');
require('dotenv').config();
const { initializeWebSocket } = require('./src/websockets/websocket');

const config = require('./config');

const startServer = async () => {
    try {
        await connectDB();

        // Servidor HTTP
        const server = http.createServer(app);
        initializeWebSocket(server);

        server.listen(config.PORT, ()=>{
            console.log(`Server running at ${config.HOST}:${config.PORT}`);
        })
    } catch(error) {
        console.log('[ERROR] Error starting the server.', error);
        process.exit(1);
    }
}

startServer();