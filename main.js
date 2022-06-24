const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const IPC = ipcMain;

function createWindow() {
    const win = new BrowserWindow({
        frame: false,
        minWidth: 1110,
        minHeight: 720,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadURL("http://localhost:3000");

    IPC.on("closeApp", () => {
        console.log("Closing App");
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
