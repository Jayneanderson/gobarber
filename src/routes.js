// constar o Router para separar a parte de roteamento do express
const { Router } = require('express');
const UserController = require('./app/controllers/UserController.js');
const SessionController = require('./app/controllers/SessionController.js');
const authMiddlware = require('./app/middlewares/auth.js');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//esta rota não deve sair daqui porque se eu rodar o update, será verificado isso aqui primeiro.
routes.use(authMiddlware);

routes.patch('/users', UserController.update);

// module.exports = routes;
module.exports = routes;
