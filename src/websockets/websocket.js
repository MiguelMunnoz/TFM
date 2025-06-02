const WebSocket = require('ws');
const {handleConnection} = require('../controllers/notificationController');

function initializeWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        handleConnection(ws, req);
    });

    console.log('WebSocket server initialized');
}

module.exports = { initializeWebSocket };
