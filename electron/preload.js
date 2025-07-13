const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    getApiKey: () => ipcRenderer.invoke('get-api-key'),
    saveApiKey: (apiKey) => ipcRenderer.invoke('save-api-key', apiKey),
    
    // System info
    platform: process.platform,
    arch: process.arch,
    versions: process.versions
});

// Prevent the renderer from accessing Node.js APIs
window.nodeRequire = undefined;
window.require = undefined;
window.exports = undefined;
window.module = undefined;

console.log('Preload script loaded');
