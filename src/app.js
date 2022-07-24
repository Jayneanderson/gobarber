// este arquivo serve para separar a criação da estrutura da aplicação para facilitar no futuro (ex: testes)
// const express = require('express'); //é o mesmo que abaixo
const express = require ('express');
const path = require('path');
const routes = require('./routes.js');
require('./database/index.js');

class App {
    constructor() {
        //isto é o mesmo que fazer server.get/put/pos (ou outro)
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());

        //serve para servir arquivos estáticos
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));
    }

    routes() {
        this.server.use(routes);
    }
}

// module.exports = new App().server;
module.exports = new App().server;