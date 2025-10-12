//SCRIPT QUE DETERMINA QUAIS OS CAMPOS E OS TIPOS DE DADOS QUE DEVEM CONTER NO BANCO DE CADASTRO DE LIVROS.

const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Livro = sequelize.define("Livro", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codigoDeBarras: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Livro