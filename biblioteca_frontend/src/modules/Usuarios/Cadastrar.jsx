//SCRIPT QUE MONTA A PÁGINA DE CADASTRO DO USUÁRIO.

//IMPORTAÇÃO DO HOOK DO REACT E DA CONEXÃO COM A API ENVIADA PELO SCRIPT DE SERVICE.

import { useState } from 'react';
import { cadastrarUsuario } from '../../services/usuariosService';

//FUNÇÃO QUE RECEBE OS CAMPOS NECESSÁRIOS DA API E MONTA A PÁGINA PARA EFETUAR O CREATE(PAGINA QUE CADASTRA OS USUÁRIOS) (C DO CRUD).
function CadastrarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [message, setMessage] = useState('');

  const handleCadastrar = async () => {
    try {
      const data = await cadastrarUsuario(nome, email, telefone);
      setMessage(data.msg);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Número de Usuário"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="E-mail do usuário"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={e => setTelefone(e.target.value)}
      />
      <button onClick={handleCadastrar}>Realizar Cadastro</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CadastrarUsuario;