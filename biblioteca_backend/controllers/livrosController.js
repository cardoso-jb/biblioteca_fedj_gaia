//SCRIPT COM AS FUNÇÕES QUE CONTROLAM AS REGRAS DE NEGÓCIO DO C.R.U.D. DOS LIVROS.

//IMPORTANTO MODULOS NECESSÁRIOS PARA AS FUNÇÕES.
const { Livro } = require("../models/index");
const { verificacoesLivro, gerarCodigoDeBarras, filtrarLivros } = require("./utils/utilsController");

//FUNÇÃO RESPONSÁVEL POR CADASTRAR UM NOVO LIVRO, RECEBE DO USUÁRIO O TÍTULO E O AUTOR, RECEBE DA FUNÇÃO DO ALGORÍTMO DE HASHING O CÓDIGO DE BARRAS CRIADO, E CRIA NO BANCO UM NOVO CADASTRO DE LIVRO.
async function criarLivro(req, res) {
    const { titulo, autor } = req.body;
    const codigoDeBarras = gerarCodigoDeBarras(titulo, autor)
    const erro = verificacoesLivro(titulo, autor, codigoDeBarras)

    if (erro) return res.status(400).json({ msg: erro });

    try {
        const novoLivro = await Livro.create({
            titulo,
            autor,
            codigoDeBarras
        })

        res.json({
            msg: "Livro cadastrado com sucesso!!!",
            livro: novoLivro
        })
    } catch (error) {
        res.status(400).json({
            msg: "Erro ao cadastrar livro",
            error: error.message
        })
    }
}

//FUNÇÃO QUE LISTA TODOS OS LIVROS BUSCANDO TODOS OS LIVROS CADASTRADOS NO BANCO
async function listarTodos(req, res) {
    try {
        const livros = await Livro.findAll()
        res.json(livros)
    } catch (error) {
        res.status(500).json({
            msg: "Erro ao listar livros",
            error: error.message
        })
    }
}

//FUNÇÃO QUE UTILIZA O ID COMO PARÂMETRO DE BUSCA PARA PROCURAR UM LIVRO.
async function buscarLivroPorId(req, res) {
    const id = req.params.id
    try {
        const livro = await Livro.findByPk(id)
        if (!livro) {
            return res.status(404).json({ msg: "Livro não encontrado" })
        } else {
            res.json(livro)
        }
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar livro", error: error.message })
    }
}


//FUNÇÃO QUE ATUALIZA O LIVRO ATRAVÉS DE UMA BUSCA PELO ID, AO ENCONTRAR O LIVRO, OFERECE A OPÇÃO DE ATUALIZAR O NOME E O AUTOR.
async function atualizarLivro(req, res) {
    const id = req.params.id
    const { autor, titulo, codigoDeBarras, status } = req.body
    try {
        const livro = await Livro.findByPk(id)
        if (!livro) {
            return res.status(404).json({ msg: "Livro não encontrado" })
        } else {
            await livro.update({ autor, titulo, codigoDeBarras, status })
            res.json(livro)
        }
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar livro", error: error.message })
    }
}

//FUNÇÃO QUE BUSCA UM LIVRO E DELETA ELE DO BANCO DE DADOS, SERÁ IMPORTANTE PARA QUANDO CRIARMOS A MODULO (FUNCIONALIDADE) DE VENDA DE LIVROS.
async function deletarLivro(req, res) {
    const id = req.params.id
    try {
        const livro = await Livro.findByPk(id)
        if (!livro) {
            return res.status(404).json({ msg: "Livro não encontrado" })
        } else {
            await livro.destroy()
            res.json({ msg: "Livro deletado com sucesso!!!" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar livro", error: error.message })
    }
}


//FUNÇÃO QUE BUSCA O LIVRO PELOS PARÂMETROS DO NOME DO LIVRO, OU NOME DO AUTOR E RETORNA O LIVRO ENCONTRADO. UTILIZA A AS FUNÇÕES DE BUSCA DO "UTILS", PARA QUE O USUÁRIO NÃO PRECISE DIGITAR O NOME DO LIVRO OU O AUTOR EXATAMENTE COMO FOI CADASTRADO NO BANCO.
async function buscarLivro(req, res) {
    const { titulo, autor } = req.query;

    try {
        let livros = await Livro.findAll();

        livros = filtrarLivros(livros, titulo, autor);

        if (livros.length === 0) {
            return res.status(404).json({ msg: "Livro não encontrado" })
        }
        res.json(livros)

    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar livro", error: error.message })
    }
}

//EXPORTAÇÃO NOMEADA DAS FUNÇÕES
module.exports = { listarTodos, criarLivro, buscarLivroPorId, atualizarLivro, deletarLivro, buscarLivro }