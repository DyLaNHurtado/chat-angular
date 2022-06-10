const { BrowserWindow, dialog } = require("electron");
let appWin = new BrowserWindow({
  width: 1200,
  height: 800,
  minWidth: 710,
  minHeight: 710,
  title: "Cosmos Desktop",
  show: false,
  resizable: true,
  icon: "https://raw.githubusercontent.com/DyLaNHurtado/chat-angular/develop/src/assets/img/logo.png",
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
  },
});
appWin.loadURL(`https://cosmos-chat.netlify.app`);
appWin.center();
appWin.setMenu(null);

appWin.on("close", (event) => {
  const resDialog = dialog.showMessageBoxSync(appWin, {
    message: " Do you want to leave Cosmos? ",
    buttons: ["Yes", "No"],
  });
  if (resDialog === 1) {
    event.preventDefault();
  }
});

appWin.on("ready-to-show", () => {
  const splash = require("./splash");
  setTimeout(() => {
    if (!splash.isDestroyed()) {
      splash.close();
    }
    appWin.show();
    appWin.focus();
  }, 5000);
});

module.exports = appWin;
