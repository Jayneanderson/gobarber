//se der pau use module.exports =
module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber',
    define: {
        timestamps: true,//tabelas created_at e update_at,
        underscored: true, //forma de criar as tabelas no formato snake_case
        underscoredAll: true,

    },
};