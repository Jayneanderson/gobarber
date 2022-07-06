
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.js');
const User = require('../models/User.js');

class SessionController {
    //vamos pegar a senha e o e-mail
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: {email: email }});

        if (!user) {
            return res.json(401).json({ error: 'User not found' });
        }

        if (!await user.checkPassword(password)) {
            return res.status(401).json({ erro: 'Password does not match' });
        }

        const { id, name } = user;
        return res.json( {
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

module.exports = new SessionController();