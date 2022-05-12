const { app, BrowserWindow } = require('electron');
const path = require('path');
const { setAllShortcuts } = require('./shortcuts');

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
    },
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();
  setAllShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})