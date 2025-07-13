const { app, BrowserWindow, Menu, dialog, ipcMain, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

let mainWindow;
let backendProcess;

// Configuration file path
const configDir = path.join(os.homedir(), 'Library', 'Application Support', 'ResumeOptimizer');
const configFile = path.join(configDir, 'config.env');

// Ensure config directory exists
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

// Function to start the backend server
function startBackend() {
    console.log('Starting backend server...');
    
    // Path to the backend executable
    const backendPath = path.join(__dirname, '..', 'backend_build', 'ResumeOptimizerBackend.app', 'Contents', 'MacOS', 'ResumeOptimizerBackend');
    
    console.log('Backend path:', backendPath);
    
    // Check if backend exists
    if (!fs.existsSync(backendPath)) {
        console.error('Backend executable not found at:', backendPath);
        dialog.showErrorBox('Error', 'Backend server not found. Please reinstall the application.');
        return;
    }
    
    // Start the backend process
    backendProcess = spawn(backendPath, [], {
        stdio: 'inherit',
        detached: false
    });
    
    backendProcess.on('error', (error) => {
        console.error('Backend process error:', error);
        dialog.showErrorBox('Backend Error', `Failed to start backend: ${error.message}`);
    });
    
    backendProcess.on('exit', (code) => {
        console.log(`Backend process exited with code ${code}`);
        if (code !== 0 && !app.isQuiting) {
            dialog.showErrorBox('Backend Error', `Backend process crashed with code ${code}`);
        }
    });
}

// Function to stop the backend server
function stopBackend() {
    if (backendProcess) {
        console.log('Stopping backend server...');
        backendProcess.kill();
        backendProcess = null;
    }
}

// Function to read API key from config file
function readApiKey() {
    try {
        if (fs.existsSync(configFile)) {
            const config = fs.readFileSync(configFile, 'utf8');
            const match = config.match(/GEMINI_API_KEY=(.+)/);
            return match ? match[1].trim() : '';
        }
    } catch (error) {
        console.error('Error reading config file:', error);
    }
    return '';
}

// Function to save API key to config file
function saveApiKey(apiKey) {
    try {
        const config = `GEMINI_API_KEY=${apiKey}\\n`;
        fs.writeFileSync(configFile, config);
        return true;
    } catch (error) {
        console.error('Error saving config file:', error);
        return false;
    }
}

// Function to show API key dialog
function showApiKeyDialog() {
    const currentApiKey = readApiKey();
    
    dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'API Key Configuration',
        message: 'Enter your Google Gemini API Key',
        detail: 'You can get a free API key from https://aistudio.google.com/',
        buttons: ['OK', 'Cancel'],
        defaultId: 0,
        cancelId: 1
    }).then((result) => {
        if (result.response === 0) {
            // Show input dialog
            const { exec } = require('child_process');
            const script = `
                tell application "System Events"
                    set theResponse to display dialog "Enter your Google Gemini API Key:" default answer "${currentApiKey}" with title "Resume Optimizer - API Key" buttons {"Cancel", "Save"} default button "Save" with hidden answer
                    if button returned of theResponse is "Save" then
                        return text returned of theResponse
                    else
                        return ""
                    end if
                end tell
            `;
            
            exec(`osascript -e '${script}'`, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error showing dialog:', error);
                    return;
                }
                
                const apiKey = stdout.trim();
                if (apiKey && apiKey !== currentApiKey) {
                    if (saveApiKey(apiKey)) {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'Success',
                            message: 'API key saved successfully!',
                            detail: 'Please restart the application for changes to take effect.',
                            buttons: ['OK']
                        });
                    } else {
                        dialog.showErrorBox('Error', 'Failed to save API key. Please try again.');
                    }
                }
            });
        }
    });
}

// Function to create the main window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1000,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'assets', 'icon.png'),
        title: 'Resume Optimizer',
        titleBarStyle: 'default',
        show: false
    });

    // Load the frontend
    const frontendPath = path.join(__dirname, '..', 'frontend_build', 'index.html');
    mainWindow.loadFile(frontendPath);

    // Show window when ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        
        // Focus on the window
        mainWindow.focus();
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Handle external links
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    // Create menu
    createMenu();
}

// Function to create the application menu
function createMenu() {
    const template = [
        {
            label: 'Resume Optimizer',
            submenu: [
                {
                    label: 'About Resume Optimizer',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About Resume Optimizer',
                            message: 'Resume Optimizer v1.0.0',
                            detail: 'AI-powered resume optimization tool\\n\\nBuilt with React, FastAPI, and Electron\\nPowered by Google Gemini AI',
                            buttons: ['OK']
                        });
                    }
                },
                { type: 'separator' },
                {
                    label: 'Configure API Key...',
                    accelerator: 'CmdOrCtrl+K',
                    click: showApiKeyDialog
                },
                { type: 'separator' },
                { role: 'quit', label: 'Quit Resume Optimizer' }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Analysis',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.reload();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Open GitHub Repository',
                    click: () => {
                        shell.openExternal('https://github.com/aklamkin/resume_optmzr.1.2');
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectall' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Get Google Gemini API Key',
                    click: () => {
                        shell.openExternal('https://aistudio.google.com/');
                    }
                },
                {
                    label: 'Documentation',
                    click: () => {
                        shell.openExternal('https://github.com/aklamkin/resume_optmzr.1.2/blob/main/README.md');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Report Issue',
                    click: () => {
                        shell.openExternal('https://github.com/aklamkin/resume_optmzr.1.2/issues');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// App event handlers
app.whenReady().then(() => {
    createWindow();
    
    // Start the backend server
    setTimeout(() => {
        startBackend();
    }, 2000); // Give the frontend time to load
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    app.isQuiting = true;
    stopBackend();
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    app.isQuiting = true;
    stopBackend();
});

// IPC handlers
ipcMain.handle('get-api-key', () => {
    return readApiKey();
});

ipcMain.handle('save-api-key', (event, apiKey) => {
    return saveApiKey(apiKey);
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });
});

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // For localhost, ignore certificate errors
    if (url.startsWith('http://127.0.0.1:8001') || url.startsWith('http://localhost:8001')) {
        event.preventDefault();
        callback(true);
    } else {
        callback(false);
    }
});

console.log('Electron app started');
