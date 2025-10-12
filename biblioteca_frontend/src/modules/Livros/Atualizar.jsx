//SCRIPT QUE MONTA A PÁGINA DE ATUALIZAÇÃO DO LIVRO.

//IMPORTAÇÃO DO HOOK DO REACT E DA CONEXÃO COM A API ENVIADA PELO SCRIPT DE SERVICE.
import React, { useEffect, useState } from 'react';
import { listarLivros, atualizarLivro } from '../../services/livrosService';

//FUNÇÃO QUE RECEBE OS CAMPOS NECESSÁRIOS DA API E MONTA A PÁGINA PARA EFETUAR O UPDATE (U DO CRUD).
function AtualizarLivro() {
  const [livros, setLivros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoAutor, setNovoAutor] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarLivros();
        setLivros(dados);
      } catch (err) {
        console.error("Erro ao listar livros:", err);
        setMensagem("Erro ao carregar livros.");
      }
    }
    carregar();
  }, []);

  const iniciarEdicao = (livro) => {
    setEditandoId(livro.id);
    setNovoTitulo(livro.titulo);
    setNovoAutor(livro.autor);
    setMensagem('');
  };

  const salvarEdicao = async () => {
    if (!novoTitulo && !novoAutor) {
      setMensagem("Informe ao menos um campo para alterar.");
      return;
    }
    try {
      const resposta = await atualizarLivro(editandoId, {
        titulo: novoTitulo,
        autor: novoAutor
      });
      const livroAtualizado = resposta.livro || resposta;
      setLivros(prev =>
        prev.map(l => (l.id === editandoId ? livroAtualizado : l))
      );
      setMensagem("Livro atualizado com sucesso.");
      setEditandoId(null);
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      setMensagem("Erro ao atualizar livro.");
    }
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setMensagem('');
  };

  const livrosParaMostrar = editandoId
    ? livros.filter(l => l.id === editandoId)
    : livros;

  return (
    <div>
      <h2>Atualizar Livro</h2>
      {mensagem && <p>{mensagem}</p>}
      <ul>
        {livrosParaMostrar.map(livro => (
          <li key={livro.id}>
            {editandoId === livro.id ? (
              <>
                <input
                  type="text"
                  value={novoTitulo}
                  placeholder="Novo Título"
                  onChange={e => setNovoTitulo(e.target.value)}
                />
                <input
                  type="text"
                  value={novoAutor}
                  placeholder="Novo Autor"
                  onChange={e => setNovoAutor(e.target.value)}
                />
                <button onClick={salvarEdicao}>Salvar</button>
                <button onClick={cancelarEdicao}>Cancelar</button>
              </>
            ) : (
              <>
                {livro.titulo} — {livro.autor}
                <button onClick={() => iniciarEdicao(livro)}>Atualizar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AtualizarLivro;