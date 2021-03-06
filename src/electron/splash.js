const { BrowserWindow } = require("electron");
const path = require('path');
const url = require('url');
let splash = new BrowserWindow({
    width: 500, 
    height: 300, 
    frame: false,
    alwaysOnTop: true,
    show:false,
    resizable:false
});
splash.loadURL(url.format({
    pathname: path.join(__dirname, "splash.html"),
    protocol: 'file:',
    slashes: true
}));
splash.center();
splash.on('ready-to-show',()=>{
    splash.show();
});
module.exports=splash;