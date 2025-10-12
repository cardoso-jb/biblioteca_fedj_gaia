//SCRIPT QUE MONTA A PÁGINA DE LISTA TODOS OS USUÁRIOS CADASTRADOS DO BANCO.

//IMPORTAÇÃO DO HOOK DO REACT E DA CONEXÃO COM A API ENVIADA PELO SCRIPT DE SERVICE.
import { useState, useEffect } from 'react';
import { listarUsuarios } from '../../services/usuariosService';

//FUNÇÃO QUE RECEBE OS CAMPOS NECESSÁRIOS DA API E MONTA A PÁGINA PARA EFETUAR O READ, LISTANDO TODOS OS USUÁRIOS JÁ CADASTRADOS (R DO CRUD).
function ListarTodosUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const data = await listarUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao listar usuarios:", error);
      }
    }
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            {usuario.nome} — {usuario.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarTodosUsuarios