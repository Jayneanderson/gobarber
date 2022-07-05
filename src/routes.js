// constar o Router para separar a parte de roteamento do express
const { Router } = require('express');
const User = require('./app/models/User.js');

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Jay Show',
        email: 'jayneanderson@gupy.com.br',
        password_hash: '12345612',
    });
    return res.json(user);
});

// module.exports = routes;
module.exports = routes;