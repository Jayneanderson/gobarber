// importar o Router para separar a parte de roteamento do express
import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({message: 'Hello World'})
});

// module.exports = routes;
export default routes;