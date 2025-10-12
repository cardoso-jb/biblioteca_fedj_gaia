//SCRIPT QUE AGREGA OS MODULOS DO CRUD DOS USUÁRIOS, É A PÁGINA PRINCIPAL DE AÇÕES POSSÍVEIS DO MÓDULO DO USUÁRIOS, POR ENQUANTO CONTA APENAS COM O CRIAR E O LER (LISTAR).

//IMPORTAÇÕES NECESSÁRIAS DO HOOK DO REACT E DOS MÓDULOS NECESSÁRIOS PARA MONTAR A PÁGINA PRINCIPAL
import { useState } from 'react';
import CadastrarUsuario from './Cadastrar';
import ListarTodosUsuarios from './Listar';

//REUNE TODAS AS AÇÕES EM UMA ÚNICA ABA, QUE AO CLICAR, ABRE A ABA INTERNA PARA EXECUÇÃO DE UMA AÇÃO REFERENTE AO USUÁRIO.
function UsuariosModule() {
  const [abaInterna, setAbaInterna] = useState('');

  return (
    <div>
      <div className="subnav">
        {abaInterna === '' && (
          <>
            <button onClick={() => setAbaInterna('cadastrar')}>Cadastrar Usuário</button>
            <button onClick={() => setAbaInterna('listar')}>Listar Todos Usuários</button>
          </>
        )}
        {abaInterna !== '' && (
          <button onClick={() => setAbaInterna('')}>Voltar</button>
        )}
      </div>

      <div className="conteudo">
        {abaInterna === 'cadastrar' && <CadastrarUsuario />}
        {abaInterna === 'listar' && <ListarTodosUsuarios />}
      </div>
    </div>
  );
}

export default UsuariosModule;