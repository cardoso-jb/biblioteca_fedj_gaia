//SCRIPT QUE DETERMINA QUAIS OS CAMPOS E OS TIPOS DE DADOS QUE DEVEM CONTER NO BANCO DE USUÁRIOS.

const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: "Usuarios"
});

module.exports = Usuario