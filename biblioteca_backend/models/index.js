//SCRIPT QUE FAZ A CONEXÃO ENTRE OS BANCO DE DADOS DE EMPRÉSTIMO, LIVRO E USUÁRIO.

const Usuario = require("./usuario");
const Livro = require("./livro");
const Emprestimo = require("./emprestimo");

Usuario.hasMany(Emprestimo, { foreignKey: "clienteId" });
Emprestimo.belongsTo(Usuario, { foreignKey: "clienteId" });

Livro.hasMany(Emprestimo, { foreignKey: "livroId" });
Emprestimo.belongsTo(Livro, { foreignKey: "livroId" });

module.exports = { Usuario, Livro, Emprestimo };