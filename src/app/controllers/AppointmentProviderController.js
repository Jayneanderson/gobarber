const { startOfDay, endOfDay ,parseISO } = require('date-fns');
const { Op } = require('sequelize');//isso aqui é para usar o between

const Appointment = require('../models/Appointment.js');
const User = require('../models/User.js');

class ApponintmentProviderController {
    async index(req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkUserProvider) {
            return res.json(401).json({ error: 'USer is not a provider' });
        }

        const { date } = req.query;
        const parseDate = parseISO(date);

        const providerAppointmens = await Appointment.findAll({
            where: { 
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    //é uma chave e os valores são array. Valida data entre início e fim
                    [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
                },
             },
             order: ['date'],
        }); 
        return res.json(providerAppointmens);
    }
}

module.exports = new ApponintmentProviderController();