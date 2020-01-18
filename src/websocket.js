const socketio = require('socket.io');

class WebSocket {
    setupWebSocket(server) {
        const io = socketio(server);

        io.on('connection', (socket) => {
            console.log(socket.id);
        })
    }


}

module.exports = new WebSocket();