const Sequelize = require('sequelize');

const User = require('../app/models/User.js');
const File = require('../app/models/File.js');

const databaseConfig = require('../config/database.js');

const models = [User, File];

class Database {
    constructor() {
        this.init();
    }
    
    init() {
        this.connection = new Sequelize(databaseConfig);
        
        models.map(model => model.init(this.connection));
    }
}

module.exports = new Database();
