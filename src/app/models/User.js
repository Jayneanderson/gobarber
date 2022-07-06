const { Model } = require('sequelize');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

//os campos abaixo são dados que o usuário vai preencher. Não necessariamente são um reflexo dos campos da nossa base
class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,//indica que este campo nunca existirá na base de dados. Apenas no código
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
        });
        
        //hook são disparos automáticos. (beforeSave) Antes de salvar ou atualizar um recurso
        this.addHook('beforeSave', async user => {
            //hash gerado apenas se for um novo password
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
        //retorne o model que acabou de ser inicializado
        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

module.exports = User;
