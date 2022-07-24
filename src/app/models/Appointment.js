const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');

//os campos abaixo são dados que o usuário vai preencher. Não necessariamente são um reflexo dos campos da nossa base
class Appointment extends Model {
    static init(sequelize) {
        super.init({
            date: Sequelize.DATE,
            canceled_at: Sequelize.DATE,
            //não preciso referenciar o campo user_id porque é gerado automaticamente pelo método associate
        },
        {
            sequelize,
        });
        return this;
    }
    static associate(models) {
        //quando tenho dois relacionamentos eu sou obrigado a dar um apelido
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
    }
}

module.exports = Appointment;
