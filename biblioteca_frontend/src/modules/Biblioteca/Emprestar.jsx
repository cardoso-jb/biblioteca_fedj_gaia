//SCRIPT QUE MONTA A PÁGINA DE EMPRÉSTIMO DO LIVRO.

//IMPORTAÇÃO DO HOOK DO REACT E DA CONEXÃO COM A API ENVIADA PELO SCRIPT DE SERVICE.
import { useState } from 'react';
import { realizarEmprestimo } from '../../services/bibliotecaService';

//FUNÇÃO QUE RECEBE OS CAMPOS NECESSÁRIOS DA API E MONTA A PÁGINA PARA O USUÁRIO PREENCHER.
function Emprestar({ onSucesso }) {
  const [usuarioId, setUsuarioId] = useState('');
  const [codigoDeBarras, setCodigoDeBarras] = useState('');
  const [submetido, setSubmetido] = useState(false)
  
  const handleEmprestimo = async () => {
    try {
      const data = await realizarEmprestimo(usuarioId, codigoDeBarras);
      onSucesso(data.msg);
      setSubmetido(true);
    } catch (error) {
      onSucesso(error.message);
      setSubmetido(true);
    }
  };
  if (submetido) {
    return null;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Número de Usuário"
        value={usuarioId}
        onChange={e => setUsuarioId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Código de Barras"
        value={codigoDeBarras}
        onChange={e => setCodigoDeBarras(e.target.value)}
      />
      <button onClick={handleEmprestimo}>Realizar Empréstimo</button>
    </div>
  );
}

export default Emprestar;