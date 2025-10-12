//SCRIPT COM AS ROTAS DO C.R.U.D. DOS LIVROS, UTILIZA O MÉTODO E A ROTA PARA CHAMAR A FUNÇÃO DO CONTROLLER

const express = require ("express");
const { listarTodos, criarLivro, buscarLivroPorId, atualizarLivro, deletarLivro, buscarLivro } = require("../controllers/livrosController");

const router = express.Router()


router.post("/cadastrar", criarLivro)

router.get("/", listarTodos)

router.get("/buscar", buscarLivro)

router.get("/:id", buscarLivroPorId)

router.put("/:id", atualizarLivro)

router.delete("/:id", deletarLivro)


module.exports = router

