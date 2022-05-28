// este arquivo serve para separar a criação da estrutura da aplicação para facilitar no futuro (ex: testes)
// const express = require('express'); //é o mesmo que abaixo
import express from 'express';
import routes from './routes.js';

class App {
    constructor() {
        //isto é o mesmo que fazer server.get/put/pos (ou outro)
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

// module.exports = new App().server;
export default new App().server;