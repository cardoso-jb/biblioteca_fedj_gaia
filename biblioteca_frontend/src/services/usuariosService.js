//SCRIPT RESPONSÁVEL PELAS REQUISIÇÕES AO MÓDULO DE USUÁRIOS DA API

import API from "./api";

export const cadastrarUsuario = async(nome, email, telefone) => {
    try {
        const resposta = await API.post("/usuarios/cadastrar", {nome, email, telefone})
        return resposta.data;
    } catch (error) {
        throw new Error(error.resposta?.data?.msg||"Erro ao realizar cadastro do usuário!")
    }
};

export const listarUsuarios = async() => {
    try {
        const resposta = await API.get("/usuarios")
        return resposta.data;
    } catch (error) {
        throw new Error(error.resposta?.data?.msg||"Erro listar os usuários!")
    }
}