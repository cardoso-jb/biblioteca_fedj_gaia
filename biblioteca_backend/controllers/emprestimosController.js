//SCRIPT COM AS FUNÇÕES QUE CONTROLAM AS REGRAS DE NEGÓCIO PARA EMPRESTAR E DEVOLVER OS LIVROS

//IMPORTANTO MODULOS NECESSÁRIOS PARA AS FUNÇÕES
const { Usuario, Livro, Emprestimo } = require("../models/index")

//FUNÇÃO ASSINCRONA PARA REALIZAR O EMPRÉSTIMO DO LIVRO. A FUNÇÃO UTILIZA O ID DO USUÁRIO E ATRIBUI O LIVRO QUE ESTEJA COM STATUS "TRUE"(DISPONÍVEL) A AQUELE USUÁRIO, O LIVRO É ATRIBUIDO AO USUÁRIO ATRAVÉS DO CODIGO DE BARRAS E DO ID. APÓS ATRIBUIÇÃO, O "STATUS" É ATUALIZADO PARA "FALSE". RETORNA UM JSON COM UMA MENSAGEM DE SUCESSO, E OS DADOS DO LIVRO.
async function realizarEmprestimo (req, res) {
    const { usuarioId, codigoDeBarras } = req.body
    try {
        const usuarioEmp = await Usuario.findByPk(usuarioId)
        const livroDisponivel = await Livro.findOne({ 
            where: { codigoDeBarras, status: true } 
        });
        if (!usuarioEmp) {
            return res.status(404).json({ msg: "Usuário não encontrado." })
        }
        if(!livroDisponivel) {
            return res.status(404).json({ msg: "Nenhum livro disponível no momento." })
        }
        const emprestimo = await Emprestimo.create({
            clienteId: usuarioId,
            livroId: livroDisponivel.id,
            status: true
        });
        
        await livroDisponivel.update({ status: false }, { fields: ["status"] });
        res.json({ msg: "Empréstimo realizado com sucesso", 
            emprestimo,
            livroEmprestado: {
                id: livroDisponivel.id,
                titulo: livroDisponivel.titulo,
                codigoDeBarras: livroDisponivel.codigoDeBarras
            }
         });


    } catch (error) {
        res.status(500).json({ msg: "Erro ao realizar o empréstimo", error: error.message })
    }
}

//FUNÇÃO ASSINCRONA PARA REALIZAR A DEVOLUÇÃO DO LIVRO. A FUNÇÃO VERIFICA SE HÁ UM EMPRÉSTIMO ATIVO NO BANCO DE DADOS QUE RELACIONA O LIVRO QUE ESTÁ SENDO DEVOLVIDO COM AQUELE USUÁRIO, SE HOUVER, REALIZA A AÇÃO DE DEVOLUÇÃO E ATUALIZA O "STATUS" DO LIVRO. RETORNA UM JSON COM UMA MENSAGEM DE SUCESSO, E OS DADOS DO LIVRO.
async function realizarDevolucao (req, res) {
    const { usuarioId, codigoDeBarras } = req.body
    try {
        const emprestimoAtivo = await Emprestimo.findOne({
            where: { clienteId: usuarioId, status: true },
            include: [{ model: Livro, where: { codigoDeBarras } }]
        });
        if (!emprestimoAtivo) {
            return res.status(404).json(
            { msg: "Nenhum empréstimo ativo encontrado para este livro e usuário" }
        );
        }
        await emprestimoAtivo.update({
            status: false,
            dataDevolucao: new Date()
        })

        await emprestimoAtivo.Livro.update({ status: true }, { fields: ["status"] });
        res.json({ msg: "Devolução realizada com sucesso", 
            emprestimoAtivo,
            livroDevolvido: {
                id: emprestimoAtivo.Livro.id,
                titulo: emprestimoAtivo.Livro.titulo,
                codigoDeBarras: emprestimoAtivo.Livro.codigoDeBarras
            }
         });


    } catch (error) {
        res.status(500).json({ msg: "Erro ao realizar a devolução", error: error.message })
    }
}

//EXPORTAÇÃO NOMEADA DAS FUNÇÕES
module.exports = { realizarEmprestimo, realizarDevolucao };