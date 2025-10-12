# 📚 Biblioteca FEDJ Gaia

[![Electron](https://img.shields.io/badge/Electron-25.0.0-47848F?logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18.0.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/Licença-Educacional-blue)](#)

---

## 🧾 Descrição

O **Biblioteca FEDJ Gaia** é um sistema desktop completo para **gerenciamento de biblioteca**, desenvolvido com:
- **Frontend em React + Vite**
- **Backend em Node.js + Express + SQLite**
- **Interface Desktop com Electron**

Permite o **cadastro, atualização, listagem, busca e exclusão de livros e usuários**, além do **controle de empréstimos e devoluções**.

---

## 🚀 Tecnologias Utilizadas

| Camada | Tecnologia | Descrição |
|:--------|:-------------|:------------|
| 🖥️ Frontend | React + Vite | Interface moderna e reativa |
| ⚙️ Backend | Node.js + Express | API local integrada |
| 💾 Banco de Dados | SQLite | Persistência local |
| 💻 Desktop | Electron | Empacotamento em app executável |
| 🧱 Build | Electron Builder | Geração de `.exe`, `.dmg`, `.AppImage` |

---

## 🏗️ Estrutura do Projeto

```
📦 BIBLIOTECA_FEDJ_GAIA
├── assets/                  # Ícones e imagens do app
├── biblioteca_backend/      # API Node.js (Express + SQLite)
│   ├── server.js
│   ├── models/
│   └── routes/
├── biblioteca_frontend/     # Interface React (Vite)
│   ├── public/
│   └── src/
├── electron/                # Configuração e scripts do Electron
│   ├── main.js
│   └── preload.js
├── db/                      # Banco de dados local (ex: biblioteca.db)
├── package.json             # Configuração principal do projeto
└── README.md                # Este arquivo
```

---

## ⚙️ Instalação e Configuração

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/BIBLIOTECA_FEDJ_GAIA.git
cd BIBLIOTECA_FEDJ_GAIA
```

### 2️⃣ Instale as dependências principais

```bash
npm install
```

### 3️⃣ Instale as dependências do frontend

```bash
cd biblioteca_frontend
npm install
cd ..
```

### 4️⃣ Instale as dependências do backend

```bash
cd biblioteca_backend
npm install
cd ..
```

---

## 💻 Rodando em modo desenvolvimento

Para executar o projeto completo (Electron + Frontend + Backend):

```bash
npm run electron:dev
```

O aplicativo será aberto em uma janela do **Electron**, utilizando o frontend React e o backend Node localmente.

---

## 🏁 Gerar versão de produção (build)

Para criar a versão final (executável `.exe`):

```bash
npm run electron:prod
```

📦 O executável será gerado dentro da pasta:

```
release/
```

---

## 🧩 Scripts principais

| Comando | Descrição |
|----------|------------|
| `npm run electron:dev` | Roda o app completo em modo desenvolvimento |
| `npm run electron:prod` | Gera o executável de produção |
| `npm run backend:start` | Inicia o servidor backend manualmente |
| `npm run frontend:dev` | Roda o frontend (React) no navegador |

---

## 🗃️ Banco de Dados

- O banco de dados utilizado é **SQLite**, armazenado localmente na pasta `db/`.  
- Todos os cadastros de livros, usuários e empréstimos são persistidos neste arquivo.  
- Para fazer backup, basta copiar o arquivo `.db`.

---

## 🧠 Funcionalidades

✅ Cadastro, listagem de **usuários**  
✅ Cadastro, busca, atualização e exclusão de **livros**  
✅ Registro de **empréstimos e devoluções**  
✅ Interface desktop multiplataforma (Windows / Linux / macOS)  
✅ Banco de dados local e persistente  

---

## 🎨 Melhorias Futuras

- [ ] Reformular a interface (layout e espaçamento)
- [ ] Implementar a atualização e exclusão de usuários
- [ ] Implementar busca e filtros avançados
- [ ] Criar modo escuro
- [ ] Criar módulo de vendas de livros
- [ ] Adicionar sincronização em nuvem
- [ ] Sistema de relatórios/exportação (PDF/Excel)

---

## 🧑‍💻 Desenvolvido por

J. Cardoso (https://github.com/cardoso-jb)
Sistema de biblioteca desenvolvido para fins educacionais e administrativos.

---

## 🪪 Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

---

✨ *Feito com dedicação e tecnologia aberta.*
