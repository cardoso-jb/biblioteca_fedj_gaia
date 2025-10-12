//SCRIPT QUE AGREGA OS MODULOS TODOS OS MÓDULOS PARA MONTAR A PAGINA PRINCIPAL COM AS OPÇÕES DE EMPRÉSTIMO E DEVOLUÇÃO.

//IMPORTAÇÃO DOS HOOKS DO REACT E DOS MODULOS DE EMPRESTIMO E DEVOLUÇÃO DO JSX.
import { useState, useEffect } from 'react';
import Emprestar from './Emprestar';
import Devolver from './Devolver';

//REUNE TODAS AS AÇÕES EM UMA ÚNICA ABA, QUE AO CLICAR, ABRE A ABA INTERNA PARA EXECUÇÃO DE UMA AÇÃO (EMPRESTAR OU DEVOLVER).
function BibliotecaModule({ resetTrigger}) {
  const [abaInterna, setAbaInterna] = useState('');
  const [mensagemGlobal, setMensagemGlobal] = useState('');

  useEffect(() => {
    if (resetTrigger) {
      setAbaInterna('');
      setMensagemGlobal('');
    }
  }, [resetTrigger]);

  const handleSucesso = (mensagemDoFilho) => {
    setMensagemGlobal(mensagemDoFilho ||'Operação realizada com sucesso!');
    setTimeout(() =>{
      setAbaInterna('');
      setMensagemGlobal('');
    }, 3000)
  }

  return (
    <div>
      <div className="subnav">
        {abaInterna === '' && (
          <>
            <button onClick={() => setAbaInterna('emprestar')}>Emprestar</button>
            <button onClick={() => setAbaInterna('devolver')}>Devolver</button>
          </>
        )}
        {abaInterna !== '' && (
          <button onClick={() => setAbaInterna('')}>Voltar</button>
        )}
      </div>

      <div className="conteudo">
        {abaInterna === 'emprestar' && (<Emprestar onSucesso={ handleSucesso } />)}
        {abaInterna === 'devolver' && <Devolver onSucesso={ handleSucesso } />}
        {abaInterna === '' && (<p>Selecione “Emprestar” ou “Devolver” acima.</p>)}
      </div>
      {mensagemGlobal && <p>{mensagemGlobal}</p>}
    </div>
  );
}

export default BibliotecaModule;