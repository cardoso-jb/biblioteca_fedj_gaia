//SCRIPT QUE RECEBE OS PRINCIPAIS MÓDULOS DO PROGRAMA.

//IMPORTAÇÃO DO HOOK E DOS MÓDULOS
import { useState } from "react";
import BibliotecaModule from "./modules/Biblioteca/BibliotecaModule";
import UsuariosModule from "./modules/Usuarios/UsuariosModule";
import LivrosModule from "./modules/Livros/LivrosModule";

//CRIAÇÃO DA PÁGINA PRINCIPAL
function App() {
  const [abaAtual, setAbaAtual] = useState('')
  return (
    <div>
      <nav>
        <img src="./images/logobranco.png" alt="Logo FEDJ" onClick={() => setAbaAtual('')} />
        <div class="nav-buttons">
          <button onClick={() => setAbaAtual('cadastrar')}>Usuários</button>
          <button onClick={() => setAbaAtual('livros')}>Livros</button>
          <button onClick={() => setAbaAtual('emprestimo')}>Empréstimo / Devolução</button>
        </div>
      </nav>

      <main>
        {abaAtual === '' && (
          <>
            <h1>Biblioteca FEDJ Gaia</h1>
            <p>Versão 1.0 Teste</p>
          </>
        )}
        {abaAtual === 'emprestimo' && <BibliotecaModule resetTrigger={true} />}
        {abaAtual === 'cadastrar' && <UsuariosModule />}
        {abaAtual === 'livros' && <LivrosModule />}
      </main>
    </div>
  );
}


export default App;