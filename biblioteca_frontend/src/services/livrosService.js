//SCRIPT RESPONSÁVEL PELAS REQUISIÇÕES AO MÓDULO DE USUÁRIO DA API


import API from "./api";

export const cadastrarLivro = async(titulo, autor) => {
    try {
        const resposta = await API.post("/livros/cadastrar", {titulo, autor})
        return resposta.data;
    } catch (error) {
        throw new Error(error.resposta?.data?.msg||"Erro ao realizar cadastro do livro!")
    }
};

export const listarLivros = async () => {
  const resposta = await API.get("/livros");
  return resposta.data;
};

export const buscarLivros = async (filtros) => {
  const response = await API.get("/livros/buscar", { params: filtros });
  return response.data;
};

export const atualizarLivro = async (livroId, dados) => {
  const response = await API.put(`/livros/${livroId}`, dados);
  return response.data;
};

export const deletarLivro = async (livroId) => {
  const response = await API.delete(`/livros/${livroId}`);
  return response.data;
};