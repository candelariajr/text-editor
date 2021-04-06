const electron = require('electron');
const {app, BrowserWindow, ipcMain, dialog} = electron;
const path = require('path');
const fs = require('fs');

let window = null;
//let window2 = null;

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
    /*
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
    */
});

ipcMain.on('save', (event,text) => {
    console.log(text);
    setTimeout(()=>{
        event.sender.send('store-data', text);
    }, 1000)

    dialog.showSaveDialog(window, {
        title: 'Save Window',
        defaultPath: 'fileName.txt'
    }).then(r => {
        if(!r.canceled){
            fs.writeFile(r.filePath,text, (err) => {
                if(err){
                    dialog.showMessageBox(window, {
                        title: 'Text App',
                        message: 'Error:' + err,
                    }).then(r => {
                        console.log(r.response);
                    });
                }else{
                    dialog.showMessageBox(window, {
                        title: 'Text App',
                        message: 'Saved successfully!'
                    }).then(r => {
                        console.log(r.response);
                    });
                }
            });
        }else{
            console.log("User cancelled dialog");
        }
    });
});