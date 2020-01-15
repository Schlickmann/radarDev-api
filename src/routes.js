const { Router } = require('express');
const DeveloperController = require('./controllers/DeveloperController')

const routes = Router();

// Routes: Get; Post; Put; Delete

routes.post('/developers', DeveloperController.store);

module.exports = routes;