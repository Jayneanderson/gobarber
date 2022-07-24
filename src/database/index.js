const Sequelize = require('sequelize');

const User = require('../app/models/User.js');
const File = require('../app/models/File.js');
const Appointment = require('../app/models/Appointment.js');

const databaseConfig = require('../config/database.js');

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init();
    }
    
    init() {
        this.connection = new Sequelize(databaseConfig);
        models
        .map(model => model.init(this.connection))
        //se o model.associate existir, eu pego o model da conexão
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

module.exports = new Database();
