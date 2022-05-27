// importar o Router para separar a parte de roteamento do express
const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({message: 'Hello World'})
});

module.exports = routes;