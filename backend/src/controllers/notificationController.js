const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const notificationService = require('../services/notificationServices');
const config = require('../config/config');

function handleConnection(ws, req) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
        return ws.close();
    }

    notificationService.addClient(validateToken(token, ws));

    ws.on('message', async (message) => {
        try {
            const messageData = JSON.parse(message);
            notificationService.broadcastMessage(messageData.message, messageData.taskTitle, ws.userId);
        } catch (error) {
            console.log('[ERROR] Error processing message:', error);
        }
    });

    ws.on('close', () => {
        notificationService.removeClient(ws);
    });
}

function validateToken(token, ws) {
    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        ws.userId = decoded.userId;
    } catch (error) {
        console.log('[ERROR] Error invalid token', error);
        return ws.close();
    }

    return ws;
}

module.exports = {
    handleConnection
}; 