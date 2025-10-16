//SCRIPT QUE INICIALIZA TODA A API, AUTENTICA E SINCRONIZA COM O BANCO DE DADOS, CONECTA AS ROTAS PRINCIPAIS E AS SECUNDÁRIAS, CONECTA O SERVIDOR A PORTA.

const express = require ("express");
const sequelize = require("./db/connection");
const livrosRouter = require("./routes/livros")
const emprestimosRouter = require("./routes/emprestimos")
const usuariosRouter = require("./routes/usuarios")
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: ['http://localhost:5173',
            'file://', 
  ], 
  methods: ['GET', 'POST', 'PATCH'], 
  allowedHeaders: ['Content-Type'], 
}));
app.use(express.json())
app.use("/livros", livrosRouter)
app.use("/emprestimos", emprestimosRouter)
app.use("/usuarios", usuariosRouter)

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("Conexão OK")
        app.listen(PORT, ()=> {console.log("Servidor rodando na porta 3000")})
} catch (error) {
    console.error("Erro: ", error)
}}

start()



