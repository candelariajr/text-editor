const electron = require('electron');
const {app, BrowserWindow, ipcMain, dialog} = electron;
const path = require('path');
const fs = require('fs');

const applicationTitle = "Text App";



let window = null;
let filePath = undefined; //used by save dialog and general save logic in ipcRenderer
//event 'save'

//proof of concept for multiple windows
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

//save event handler takes two arguments, the event and the contents of the main textarea
//in the Electron window
ipcMain.on('save', (event,text) => {
    console.log(text);
    //Note this for demonstrative purposes only (custom event handler)
    setTimeout(()=>{
        event.sender.send('store-data', text);
    }, 1000)
    //only go to save dialog handler if this is the first time saving (global filePath not set)
    if(filePath === undefined){
        //save dialog handler
        dialog.showSaveDialog(window, {
            title: 'Save Window',
            defaultPath: 'fileName.txt'
        }).then(r => {
            if(!r.canceled){
                //attempt to write file
                writeFile(r.filePath, text);
                // user closes save dialog, no save. Electron requires something to be here
            }else{
                console.log("User cancelled dialog");
            }
        });
    }else{
        //attempt to write the file to the global filePath if not set
        writeFile(text);
    }
});

//writes a file given the full filename and contents
//called by: main when an attempt to write a file is made
//calls: save
function writeFile(path, text){
    fs.promises.writeFile(path, text)
    .then(() => {
        save();
        //set the global file path for this session of the application
        filePath = path;
    })
    .catch(err => {
        save(err);
    })
}

//save function alert dialog. If there is no error message supplied, report successful
//save of file. If error message is supplied, report it to the user.
//called by: writeFile
function save(message = undefined){
    if(message === undefined){
        message = "Saved Successfully";
    }else{
        message = "Error: " + message;
    }

    dialog.showMessageBox(window, {
        title: applicationTitle,
        message: message
    }).then(r => {
        //Electron wants something here, but the program really doesn't care if
        //the user closed it or not
        console.log(r.response);
    });
}