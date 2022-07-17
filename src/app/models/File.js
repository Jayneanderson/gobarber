const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');

//os campos abaixo são dados que o usuário vai preencher. Não necessariamente são um reflexo dos campos da nossa base
class File extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING,
        },
        {
            sequelize,
        });
        return this;
    }
}

module.exports = File;
