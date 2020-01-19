const socketio = require('socket.io');
const ConnectionController = require('./controllers/ConnectionController');

class WebSocket {
    constructor() {
        this.io  = null;
    }

    async setServer(server) {
        this.io = socketio(server);
    }

    async setupWebSocket(server) {
        await this.setServer(server);

        this.io.on('connection', async (socket) => {

            const params = {...socket.handshake.query, socketId: socket.id };
            await ConnectionController.store(params);

            socket.on('disconnect', async () => {
          
                await ConnectionController.destroy(socket.id);
             });
        });
    }

    async findConnections(coordinates, techs) {
        return await ConnectionController.show(coordinates, techs);
    }


    async sendMessage(to, message, data) {
        to.forEach(connection => {
            this.io.to(connection.socketId).emit(message, data);
        });

    }
}

module.exports = new WebSocket();