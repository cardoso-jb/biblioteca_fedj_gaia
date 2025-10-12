//SCRIPT RESPONSÁVEL PELAS REQUISIÇÕES AO MÓDULO DE EMPRÉSTIMO DA API

import API from "./api";

export const realizarEmprestimo = async(usuarioId, codigoDeBarras) => {
    try {
        const resposta = await API.patch("/emprestimos/emprestar", {usuarioId, codigoDeBarras})
        return resposta.data;
    } catch (error) {
        throw new Error(error.resposta?.data?.msg||"Erro ao realizar empréstimo!")
    }
};

export const realizarDevolucao = async (usuarioId, codigoDeBarras) => {
    try {
        const resposta = await API.patch("/emprestimos/devolver", {usuarioId, codigoDeBarras})
        console.log(resposta)
        return resposta.data;
    } catch (error){
        throw new Error(error.respsta?.data?.msg||"Erro ao realizar devolução!")
    }
}