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
    //Note this for demonstrative purposes only (custom event handler)
    setTimeout(()=>{
        event.sender.send('store-data', text);
    }, 1000)
    //save dialog handler
    dialog.showSaveDialog(window, {
        title: 'Save Window',
        defaultPath: 'fileName.txt'
    }).then(r => {
        if(!r.canceled){
            //attempt to write file
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
        // user closes save dialog, no save
        }else{
            console.log("User cancelled dialog");
        }
    });
});