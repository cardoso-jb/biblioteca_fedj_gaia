//SCRIPT COM AS FUNÇÕES QUE CONTROLAM AS REGRAS DE NEGÓCIO DO C.R.U.D. DOS USUÁRIOS, POR ENQUANTO SÓ HÁ O CREATE E O READ.

//IMPORTANTO MODULOS NECESSÁRIOS PARA AS FUNÇÕES.
const { Usuario } = require("../models/index")

//FUNÇÃO QUE CADASTRA UM NOVO USUÁRIO COM UM FORMULÁRIO SIMPLES, O USUÁRIO É CADASTRADO COM O NOME, UM E-MAIL E UM TELEFONE, RECEBE UM "NÚMERO DE USUÁRIO", QUE É SEU ID NO BANCO DE DADOS, TAL NÚMERO SERÁ USADO PELO USUÁRIO PARA TOMAR LIVROS POR EMPRÉSTIMOS
async function cadastrarUsuario(req, res) {
    const { nome, email, telefone } = req.body;

    if(!nome || !email || !telefone) {
        return res.status(400).json({ msg: "Nome, e-mail e telefone são obrigatórios" });
    }

    try {
        const novoUsuario = await Usuario.create({
            nome,
            email,
            telefone
        })

        res.json({
            msg: "Usuário cadastrado com sucesso!!!",
            usuario: novoUsuario
        })
    } catch (error) {
        res.status(400).json({
            msg: "Erro ao cadastrar usuário",
            error: error.message
        })
    }
}

//FUNÇÃO QUE LISTA TODOS OS USUÁRIOS CADASTRADOS.
async function listarTodosUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({
            msg: "Erro ao listar usuários.",
            error: error.message
        })
    }
}

//EXPORTAÇÃO NOMEADA DAS FUNÇÕES
module.exports = { cadastrarUsuario, listarTodosUsuarios } 