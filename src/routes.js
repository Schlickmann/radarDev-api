const { Router } = require('express');

const routes = Router();

// Routes: Get; Post; Put; Delete

routes.get('/', (req,res) => {
    return res.send('oi ju');
})

module.exports = routes;