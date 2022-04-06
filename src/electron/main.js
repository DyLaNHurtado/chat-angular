const { app, BrowserWindow } = require("electron");

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth:710,
        minHeight:710,
        title: "Angular and Electron",
        resizable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    appWin.loadFile(`dist/index.html`);

    appWin.setMenu(null);

    appWin.webContents.openDevTools();

    appWin.on("closed", () => {
        appWin = null;
    });
}
const nativeImage = require('electron').nativeImage

const image = nativeImage.createFromPath('src/assets/img/logo.png')
console.log(image)
app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});