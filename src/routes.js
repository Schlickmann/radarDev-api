const { Router } = require('express');

const routes = Router();

// Routes

routes.get('/', (req,res) => {
    return res.send('oi');
})

module.exports = routes;