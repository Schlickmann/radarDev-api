const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const WebSocket = require('./websocket');
const routes = require('./routes');

class App {
    constructor() {
        this.app = express();
        this.server = http.Server(this.app);

        this.database();
        this.middlewares();
        this.routes();
    }

    database() {
        
        mongoose.connect(`${process.env.DB_CONNECTION_STRING}`, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    }

    middlewares() {
        this.app.use(cors({ origin: `${process.env.WHITELIST}` }))
        this.app.use(express.json());
        
        WebSocket.setupWebSocket(this.server);
    }

    routes() {
        this.app.use(routes);
    }
}

module.exports = new App().server;