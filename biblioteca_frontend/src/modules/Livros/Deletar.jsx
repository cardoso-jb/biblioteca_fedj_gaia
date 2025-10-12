//SCRIPT QUE MONTA A PÁGINA QUE DELETA UM LIVRO DO BANCO, SERÁ ÚTIL PARA QUANDO O MÓDULO DE VENDAS FOR IMPLANTADO.

//IMPORTAÇÃO DO HOOK DO REACT E DA CONEXÃO COM A API ENVIADA PELO SCRIPT DE SERVICE.
import React, { useEffect, useState } from 'react';
import { listarLivros, deletarLivro } from '../../services/livrosService';

//FUNÇÃO QUE RECEBE OS CAMPOS NECESSÁRIOS DA API E MONTA A PÁGINA PARA EFETUAR O DELETE (D DO CRUD).
function ExcluirLivro() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    async function fetchLivros() {
      try {
        const data = await listarLivros();
        setLivros(data);
      } catch (error) {
        console.error("Erro ao listar livros:", error);
      }
    }
    fetchLivros();
  }, []);

  const handleExcluir = async (id) => {
    try {
      await deletarLivro(id);
      setLivros(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        {livros.map(livro => (
          <li key={livro.id}>
            {livro.titulo} — {livro.autor}
            <button onClick={() => handleExcluir(livro.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExcluirLivro;