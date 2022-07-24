const Yup = require('yup');
//parse para transformar em date do js e startOfHour serve para pegar apenas a hora em si (sem minutos e segundos)
const { startOfHour, parseISO, isBefore } = require('date-fns');
const User = require('../models/User.js');
const Appointment = require('../models/Appointment.js');

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
        
        //vifica se o usuário é de fato um provedor
        const isProvider = await User.findOne({ where: { id: provider_id, provider: true } });

        if (!isProvider) {
            return res.status(401).json({ error: 'You can only create appointments with providers' });
        }

        const hourStart = startOfHour(parseISO(date));

        //a hora é antes da data atual?
        if (isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Past dates are not allowed' })
        }
        
        //o prestador já tem uma agenda no horário?
        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });
        
        //se encontrar horário acima, significa que o horário não está vago
        if (checkAvailability) {
            return res.status(400).json({ error: 'Appointment date is not available' });
        }

        const appointment = await Appointment.create({
            //pega o id quando o usuário faz login lá no auth.js
            user_id: req.userId,
            provider_id,
            //garanto que não consigo marcar outro agendamento naquele horário
            date: startOfHour,

        });

        return res.json(appointment);
    }
}


module.exports = new AppointmentController();