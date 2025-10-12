const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    // 🔹 Em desenvolvimento, carrega o Vite
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools(); // opcional, ajuda a ver erros no console
  } else {
    // 🔹 Em produção, carrega o build gerado
    win.loadFile(path.join(__dirname, '../biblioteca_frontend/dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
