const { Router } = require('express');
const DeveloperController = require('./controllers/DeveloperController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Routes: Get; Post; Put; Delete

// developers 

routes.get('/developers', DeveloperController.index);
routes.post('/developers', DeveloperController.store);

// search

routes.get('/search', SearchController.index);

module.exports = routes;