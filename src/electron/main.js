const { app, BrowserWindow } = require("electron");



createWindow = () => {
    require('./appWin');
    require('./splash');
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});