//SCRIPT QUE FAZ A CONEXÃO COM O BANCO DE DADOS

const {Sequelize} = require("sequelize");

const sequelize = new Sequelize ({
    dialect: "sqlite",
    storage:"./db/biblioteca.sqlite"
})

module.exports = sequelize