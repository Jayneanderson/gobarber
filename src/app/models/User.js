const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
            created_at: Sequelize.DATE,
        },
        {
            sequelize,
        });
    }  
}

module.exports = User;
