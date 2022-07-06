//vou verificar se o usuário está logado

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.js');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');



    try {
        //o id do usuário estará no decode (veja o método sign no SessionController)
        jwt.verify(token, authConfig.secret, (error, result) => {
            //como já garanti que este é o usuário mesmo, não preciso passar o id na rota
            req.userId = result.id;
            return next();
        });

    } catch (err) {
        return res.status(401).json({ erro: 'Token invalid' });
    }

    return next();
};