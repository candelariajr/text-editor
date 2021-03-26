const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const path = require('path');

app.on('ready', () => {
    let window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile('index.html')
        .then(() => {})
        .catch(err => console.log(err));
});

ipcMain.on('save', (event,text) => {
    console.log(text);
});
