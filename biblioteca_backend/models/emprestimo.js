//SCRIPT QUE DETERMINA QUAIS OS CAMPOS E OS TIPOS DE DADOS QUE DEVEM CONTER NO BANCO DE EMPRÉSTIMO.

const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Emprestimo = sequelize.define("Emprestimo", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    livroId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataEmprestimo: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW        
    },
    dataDevolucao: {
        type: DataTypes.DATE,
        allowNull: true        
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Emprestimo