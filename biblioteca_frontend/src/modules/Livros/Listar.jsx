//SCRIPT QUE MONTA A PÁGINA DE LISTA TODOS OS LIVROS DO BANCO.

//IMPORTAÇÃO DO HOOK DO REACT E DA CONEXÃO COM A API ENVIADA PELO SCRIPT DE SERVICE.
import { useState, useEffect } from 'react';
import { listarLivros } from '../../services/livrosService';

//FUNÇÃO QUE RECEBE OS CAMPOS NECESSÁRIOS DA API E MONTA A PÁGINA PARA EFETUAR OUTRO READ, UMA VEZ QUE LISTA TODOS OS LIVROS EXISTENTE NO BANCO DE DADOS (R DO CRUD).
function ListarTodosLivros() {
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

  return (
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        {livros.map(livro => (
          <li key={livro.id}>
            {livro.titulo} — {livro.autor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarTodosLivros