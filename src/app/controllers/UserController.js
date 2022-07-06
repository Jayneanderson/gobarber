const User = require('../models/User.js');

class UserController {
    //recebe os dados do usuário e cria um novo registro
    async store(req, res) {
        const userExistis = await User.findOne({ where: {email: req.body.email }});
        
        if (userExistis) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    async update(req, res) {
        console.log(req.userId);

        return res.json({ ok: true });
    }

}

module.exports = new UserController();