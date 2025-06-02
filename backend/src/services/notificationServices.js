const clients = new Set();

const chatService = {
    addClient(client) {
        clients.add(client);
    },

    removeClient(client) {
        clients.delete(client);
    },

    broadcastMessage(message, taskTitle, userId) {
        const completeMessage = message + ' (' + taskTitle + ')';
        clients.forEach((client) => {
            if (client.userId !== userId) {
                client.send(JSON.stringify(completeMessage));
            }
        });
    }
};

module.exports = chatService; 