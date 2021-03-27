const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveToElectron: (text) => ipcRenderer.send('save', text),
    storeData: (channel, data) => {
        ipcRenderer.on(channel, (event, data) => {
            console.log(data);
        });
    }
});
