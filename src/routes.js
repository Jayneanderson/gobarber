// constar o Router para separar a parte de roteamento do express
const { Router } = require('express');
const UserController = require('./app/controllers/UserController.js');

const routes = new Router();

routes.post('/users', UserController.store);

// module.exports = routes;
module.exports = routes;