const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const path = require('path');

let window = null;
let window2 = null;

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

    window2 = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            allowRunningInsecureContent: false,
            experimentalFeatures: false,
            preload: path.join(__dirname, "preload.js")
        }
    });

    window2.loadFile('index2.html')
        .then(() => {})
        .catch(err => console.log(err));

});

ipcMain.on('save', (event,text) => {
    console.log(text);
    setTimeout(()=>{
        event.sender.send('store-data', text);
    }, 1000)
});