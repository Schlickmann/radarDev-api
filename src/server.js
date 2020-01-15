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
        
        mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@schlickmannapps-shard-00-00-unyax.mongodb.net:27017,schlickmannapps-shard-00-01-unyax.mongodb.net:27017,schlickmannapps-shard-00-02-unyax.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=schlickmannapps-shard-0&authSource=admin&retryWrites=true&w=majority`, {
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