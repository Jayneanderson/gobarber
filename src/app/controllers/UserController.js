const Yup = require('yup');
const { password } = require('../../config/database.js');
const User = require('../models/User.js');

class UserController {
    //recebe os dados do usuário e cria um novo registro
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const userExistis = await User.findOne({ where: { email: req.body.email } });

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
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),   //se o oldPassword estiver preenchido, significa que o user quer alterar a senha, então diga que é obrigatório
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => oldPassword ? field.required() : field),
            //se o usuário tiver alterando a senha, eu quero garantir que o usuário está informando um campo de confirmação
            confirmPassword: Yup.string().when('password', (password, field) => 
            password ? field.required().oneOf([Yup.ref('password')]) : field)

        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email != user.email) {
            

            const userExistis = await User.findOne({ where: { email: email } });

            if (userExistis) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        }

        //se o usuário informou a senha antiga e se o usuário informou a senha dele é correta 
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ erro: 'Password does not match' });
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

}

module.exports = new UserController();