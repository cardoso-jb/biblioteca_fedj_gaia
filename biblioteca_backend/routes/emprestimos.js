//SCRIPT COM AS ROTAS DE EMPRESTAR E DEVOLVER OS LIVROS, UTILIZA O MÉTODO E A ROTA PARA CHAMAR A FUNÇÃO DO CONTROLLER

const express = require("express");
const { realizarEmprestimo, realizarDevolucao } = require("../controllers/emprestimosController");
const router = express.Router();

router.patch("/emprestar", realizarEmprestimo);

router.patch("/devolver", realizarDevolucao);

module.exports = router;