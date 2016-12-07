var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var Menu = electron.Menu;
var Tray = electron.Tray;

var mainWindow = null;
var tray = null;

app.on("ready", function() {
  createMainWindow();
  tray = new Tray("resources/app/profiler.png");
  var contextMenu = Menu.buildFromTemplate([
    { label: "Show", click: function() { mainWindow.show(); } },
    { label: "Quit", click: function() { mainWindow.webContents.send("core", ["close"]); } }
  ]);
  tray.setToolTip("LaunchZorro");
  tray.setContextMenu(contextMenu);
  tray.on("double-click", function() { mainWindow.show(); });
});

app.on("window-all-closed", function() {
  if(process.platform !== "darwin") {
    app.quit();
  }
});

function createMainWindow() {
  if(!mainWindow) {
    mainWindow = new BrowserWindow({ width: 1024, height: 600 });

    mainWindow.loadURL("file://" + __dirname + "/index.html");
    mainWindow.maximize();

    // mainWindow.webContents.openDevTools({ mode: "detach" });

    mainWindow.on("closed", function() {
      mainWindow = null;
    });

    mainWindow.webContents.on("devtools-opened", function() {
      mainWindow.focus();
    });
  }
}

function handleWindowEvent(args) {
  // HIDE
  if(args.length > 0 && args[0].toUpperCase() === "HIDE" && mainWindow) {
    mainWindow.hide();
  }
}

ipcMain.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "WINDOW":
        handleWindowEvent(args);
        break;
      case "CLOSE":
        mainWindow.close();
        app.quit();
        break;
    }
  }
});
