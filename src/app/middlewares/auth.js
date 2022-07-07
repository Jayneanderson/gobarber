//vou verificar se o usuário está logado

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.js');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    if (token) {
        jwt.verify(token, authConfig.secret, (error, decoded) => {

            if (error) {
                return res.status(401).json({ erro: 'Token invalid' });
            }
            req.userId = decoded.id;
            return next();
        });
    }

};