var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on("ready", function() {
  createMainWindow();
});

app.on("window-all-closed", function() {
  if(process.platform !== "darwin") {
    app.quit();
  }
});

function createMainWindow() {
  mainWindow = new BrowserWindow({ width: 1024, height: 600 });

  mainWindow.loadURL("file://" + __dirname + "/index.html");
  mainWindow.maximize();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  mainWindow.webContents.on("devtools-opened", function() {
    mainWindow.focus();
  });
}
