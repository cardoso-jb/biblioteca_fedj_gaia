const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow;
let backendProcess;

// 🚀 Função para iniciar o backend
function startBackend() {
  const isDev = !app.isPackaged;

  // Caminho do backend
  const backendPath = isDev
    ? path.join(__dirname, '../biblioteca_backend/server.js')
    : path.join(process.resourcesPath, 'app.asar.unpacked/biblioteca_backend/server.js');

  console.log("🟢 Iniciando backend em:", backendPath);

  if (!fs.existsSync(backendPath)) {
    console.error("❌ ERRO: Arquivo do backend não encontrado:", backendPath);
    return;
  }

  // 🧠 Em modo empacotado usamos "node" instalado no sistema
  // Isso evita que o Electron tente rodar o backend como se fosse ele próprio.
  backendProcess = spawn('node', [backendPath], {
    cwd: path.dirname(backendPath),
    stdio: 'inherit',
    shell: true,
  });

  backendProcess.on('error', (err) => {
    console.error('❌ Erro ao iniciar o backend:', err);
  });

  backendProcess.on('exit', (code) => {
    console.warn(`⚠️ Backend finalizado com código ${code}`);
  });
}

// 🪟 Cria a janela principal
function createWindow() {
  if (mainWindow) return; // evita abrir múltiplas janelas

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(
      path.join(__dirname, '../biblioteca_frontend/dist/index.html')
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ⚡ Evento principal do Electron
app.whenReady().then(() => {
  console.log("✅ Aplicativo iniciado. Inicializando backend...");
  startBackend();

  // Espera o backend subir antes de abrir o frontend
  setTimeout(() => {
    console.log("📦 Abrindo janela principal...");
    createWindow();
  }, 4000); // tempo de 4s para garantir que o servidor Express iniciou

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 🧹 Fecha tudo corretamente ao encerrar o app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    console.log("🛑 Fechando aplicação e encerrando backend...");
    if (backendProcess) backendProcess.kill();
    app.quit();
  }
});
