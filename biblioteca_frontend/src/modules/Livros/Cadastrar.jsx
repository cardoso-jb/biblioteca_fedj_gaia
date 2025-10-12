//SCRIPT QUE MONTA A PÁGINA DE CADASTRO DO LIVRO.

//IMPORTAÇÃO DO HOOK DO REACT E DA CONEXÃO COM A API ENVIADA PELO SCRIPT DE SERVICE.
import { useState } from 'react';
import { cadastrarLivro } from '../../services/livrosService';

//FUNÇÃO QUE RECEBE OS CAMPOS NECESSÁRIOS DA API E MONTA A PÁGINA PARA EFETUAR O CREATE(PAGINA QUE CADASTRA OS LIVROS) (C DO CRUD).
function CadastrarLivro() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [codigoDeBarras, setCodigoDeBarras] = useState('');
  const [livroCadastrado, setLivroCadastrado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  
  const handleCadastrar = async () => {
    try {
      const data = await cadastrarLivro(titulo, autor);
      setLivroCadastrado(data.livro||data)
      setMensagem('Livro cadastrado com sucesso!!!')
    } catch (error) {
      setMensagem(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Título do Livro"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Autor do Livro"
        value={autor}
        onChange={e => setAutor(e.target.value)}
      />
      <button onClick={handleCadastrar}>Realizar Cadastro</button>

      {mensagem&&<p>{mensagem}</p>}

      {livroCadastrado && (
        <div className="confirmacao-livro">
          <h3>Dados do livro cadastrado:</h3>
          <p><strong>ID:</strong> {livroCadastrado.id}</p>
          <p><strong>Título:</strong> {livroCadastrado.titulo}</p>
          <p><strong>Autor:</strong> {livroCadastrado.autor}</p>
          <p><strong>Código de Barras:</strong> {livroCadastrado.codigoDeBarras}</p>
        </div>
      )}
    </div>
  );
}

export default CadastrarLivro;