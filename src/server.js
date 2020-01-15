const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

class App {
    constructor() {
        this.server = express();

        this.database();
        this.middlewares();
        this.routes();
    }

    database() {
        mongoose.connect("mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}>@schlickmannapps-unyax.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority", {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;