//SCRIPT COM AS ROTAS DO C.R.U.D. DOS USUÁRIOS, NO MOMENTO TEMOS APENAS O C.R., DOS USUÁRIOS, UTILIZA O MÉTODO E A ROTA PARA CHAMAR A FUNÇÃO DO CONTROLLER

const express = require ("express");
const { cadastrarUsuario, listarTodosUsuarios } = require("../controllers/usuariosController")

const router = express.Router()

router.get("/", listarTodosUsuarios)
router.post("/cadastrar", cadastrarUsuario)

module.exports = router