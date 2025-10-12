//SCRIPT QUE MONTA A PÁGINA DE BUSCA DE UM DETERMINADO LIVRO.

//IMPORTAÇÃO DO HOOK DO REACT E DA CONEXÃO COM A API ENVIADA PELO SCRIPT DE SERVICE.
import React, { useState } from 'react';
import { buscarLivros } from '../../services/livrosService';

//FUNÇÃO QUE RECEBE OS CAMPOS NECESSÁRIOS DA API E MONTA A PÁGINA PARA EFETUAR O READ (R DO CRUD).
function BuscarLivro() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [resultado, setResultado] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const handleBuscar = async () => {
    if (!titulo && !autor) {
    setMensagem("Por favor, informe título ou autor para buscar.");
    setResultado([]);  
    return;
  }
    try {
      const filtros = {};
      if (titulo) filtros.titulo = titulo;
      if (autor) filtros.autor = autor;

      const livros = await buscarLivros(filtros);
      if (livros.length === 0) {
        setMensagem("Nenhum livro encontrado com esses filtros.");
      } else {
        setMensagem('');
      }
      setResultado(livros);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setMensagem("Erro ao buscar livros.");
    }
  };

  return (
    <div>
      <h2>Buscar Livro</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={e => setAutor(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      {mensagem && <p>{mensagem}</p>}

      <ul>
        {resultado.map(livro => (
          <li key={livro.id}>
            {livro.titulo} — {livro.autor} — {livro.codigoDeBarras}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuscarLivro;