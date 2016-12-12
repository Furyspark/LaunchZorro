var fs = require("fs");

var systemData = null;
var stats;
try {
  stats = fs.statSync(__dirname + "/system.json");
} catch (e) {
  if(e) console.log(e);
} finally {
  if(stats && stats.isFile()) systemData = JSON.parse(fs.readFileSync(__dirname + "/system.json"));
}
delete stats;

var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var Menu = electron.Menu;
var Tray = electron.Tray;

var mainWindow = null;
var editorWindow = null;
var tray = null;

app.on("ready", function() {
  createMainWindow();
  tray = new Tray(__dirname + "/profiler.png");
  var contextMenu = Menu.buildFromTemplate([
    { label: "Show", click: function() { mainWindow.show(); } },
    { label: "Editor", click: function() { createEditorWindow(); } },
    { label: "Quit", click: function() {
      if(mainWindow) mainWindow.webContents.send("core", ["close"]);
      if(editorWindow) editorWindow.webContents.send("core", ["close"]);
    } }
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

    if(!systemData) mainWindow.webContents.openDevTools({ mode: "detach" });

    mainWindow.on("closed", function() {
      mainWindow = null;
    });

    mainWindow.webContents.on("devtools-opened", function() {
      mainWindow.focus();
    });
  }
}

function createEditorWindow() {
  if(!editorWindow) {
    editorWindow = new BrowserWindow({ width: 1024, height: 768 });

    editorWindow.loadURL("file://" + "/editor/index.html");
    editorWindow.maximize();

    if(!systemData) editorWindow.webContents.openDevTools({ mode: "detach" });

    editorWindow.on("closed", function() {
      editorWindow = null;
    });

    editorWindow.webContents.on("devtools-opened", function() {
      editorWindow.focus();
    });
  } else {
    editorWindow.show();
  }
}

ipcMain.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && mainWindow) {
          mainWindow.hide();
        }
        break;
      case "CLOSE":
        if(mainWindow) mainWindow.close();
        if(editorWindow) editorWindow.close();
        app.quit();
        break;
      case "EDITOR":
        if(args.length > 0 && args[0].toUpperCase() === "OPEN") createEditorWindow();
        break;
    }
  }
});

ipcMain.on("editor", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "SAVED":
        mainWindow.send("core", ["profile", "reload"]);
        break;
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && editorWindow) {
          editorWindow.hide();
        }
        break;
    }
  }
});
