const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/databse');
const { initializeWebSocket } = require('./src/websockets/websocket');

const localhost = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        // Servidor HTTP
        const server = http.createServer(app);
        initializeWebSocket(server);

        server.listen(PORT, ()=>{
            console.log(`Server running at ${localhost}:${PORT}`);
        })
    } catch(error) {
        console.log('[ERROR] Error starting the server.', error);
        process.exit(1);
    }
}

startServer();