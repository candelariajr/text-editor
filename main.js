const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
    let window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false
        }
    });

    window.loadFile('index.html')
        .then(() => {})
        .catch(err => console.log(err));
});
