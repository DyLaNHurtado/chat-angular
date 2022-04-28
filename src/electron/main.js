const { app, BrowserWindow } = require("electron");
const path = require('path');
const url = require('url');
let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth:710,
        minHeight:710,
        title: "Angular and Electron",
        resizable: true,
        icon: "https://raw.githubusercontent.com/DyLaNHurtado/chat-angular/develop/src/assets/img/logo.png",
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        }
    });
    
    appWin.loadURL(`http://localhost:4200`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});