const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveToElectron: (text) => ipcRenderer.send('save', text),
    storeData: (channel, func) => {
        ipcRenderer.on(channel, func);
    }
});