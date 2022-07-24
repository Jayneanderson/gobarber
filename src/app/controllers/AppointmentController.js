const Appointment = require('../models/Appointment.js');
const Yup = require('yup');
const User = require('../models/User.js');

class AppointmentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            res.status(400).json({ error: 'Validation fails' });
        }

        const { provider_id, date } = req.body;
        
        /* 
        * Check is provider id is a privider
        */
        
        const isProvider = await User.findOne({ where: { id: provider_id, provider: true } });

        if (!isProvider) {
            return res.status(401).json({ error: 'You can only create appointments with providers' });
        }

        const appointment = await Appointment.create({
            //pega o id quando o usuário faz login lá no auth.js
            user_id: req.userId,
            provider_id,
            date,

        });
        return res.json(appointment);
    }
}


module.exports = new AppointmentController();