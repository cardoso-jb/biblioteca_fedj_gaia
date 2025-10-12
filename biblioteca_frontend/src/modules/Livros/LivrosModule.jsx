//SCRIPT QUE AGREGA OS MODULOS DO CRUD DO LIVRO, É A PÁGINA PRINCIPAL DE AÇÕES POSSÍVEIS DO MÓDULO DO LIVRO.

//IMPORTAÇÕES NECESSÁRIAS DO HOOK DO REACT E DOS MÓDULOS NECESSÁRIOS PARA MONTAR A PÁGINA PRINCIPAL
import { useState } from 'react';
import CadastrarLivro from './Cadastrar';
import ListarTodosLivros from './Listar';
import BuscarLivro from './Buscar';
import AtualizarLivro from './Atualizar';
import ExcluirLivro from './Deletar';

//REUNE TODAS AS AÇÕES EM UMA ÚNICA ABA, QUE AO CLICAR, ABRE A ABA INTERNA PARA EXECUÇÃO DE UMA AÇÃO.
function LivrosModule() {
  const [abaInterna, setAbaInterna] = useState('');

  return (
    <div>
      <div className="subnav">
        {abaInterna === '' && (
          <>
            <button onClick={() => setAbaInterna('cadastrar')}>Cadastrar Livro</button>
            <button onClick={() => setAbaInterna('listar')}>Listar Todos os Livros</button>
            <button onClick={() => setAbaInterna('buscar')}>Buscar Livro</button>
            <button onClick={() => setAbaInterna('atualizar')}>Atualizar Livro</button>
            <button onClick={() => setAbaInterna('deletar')}>Deletar Livro</button>
          </>
        )}
        {abaInterna !== '' && (
          <button onClick={() => setAbaInterna('')}>Voltar</button>
          )}
      </div>

      <div className="conteudo">
        {abaInterna === 'cadastrar' && <CadastrarLivro />}
        {abaInterna === 'listar' && <ListarTodosLivros />}
        {abaInterna === 'buscar' && <BuscarLivro />}
        {abaInterna === 'atualizar' && <AtualizarLivro />}
        {abaInterna === 'deletar' && <ExcluirLivro />}
      </div>
    </div>
  );
}

export default LivrosModule;