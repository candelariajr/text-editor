const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const path = require('path');

let window = null;

app.on('ready', () => {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            allowRunningInsecureContent: false,
            experimentalFeatures: false,
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile('index.html')
        .then(() => {})
        .catch(err => console.log(err));
});

ipcMain.on('save', (event,text) => {
    console.log(text);
    setTimeout(()=>{
        //window.webContents.send('store-data', "MESSAGE");
        event.sender.send('store-data', "MESSAGE");
    }, 1000)
});
