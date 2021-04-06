const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveToElectron: (text) => ipcRenderer.send('save', text),
    storeData: (channel, func) => {
        ipcRenderer.on(channel, func); //Note this is not a proper way to "message", It's just a demonstration of
        //creating a custom event and having a handler for said event on the renderer side.
    },
});