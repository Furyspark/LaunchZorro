var programInfo = {
  version: {
    major: 0,
    minor: 1,
    build: 2,
    toString: function() {
      return this.major.toString() + "." + this.minor.toString() + "." + this.build.toString();
    }
  }
};


var fs = require("fs");

var systemData = null;
var stats;
try {
  stats = fs.statSync(__dirname + "/system.json");
} catch (e) {
  // if(e) console.log(e);
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
var recentProfiles = [];


//------------------------------------------------------------------------
// ConfigManager
//

function ConfigManager() {}

ConfigManager._config = null;

ConfigManager.generateConfig = function() {
  this._config = {
    startMinimized: false
  };
}

ConfigManager.save = function() {
  fs.writeFileSync("core-config.json", JSON.stringify(this._config));
}

ConfigManager.load = function() {
  var stats;
  try {
    stats = fs.statSync("core-config.json");
  } catch(e) {
    // if(e) console.log(e);
  } finally {
    if(stats && stats.isFile()) this._config = JSON.parse(fs.readFileSync("core-config.json"));
    else ConfigManager.generateConfig();
  }
}


ConfigManager.load();

//------------------------------------------------------------------------
// App
//

app.on("ready", function() {
  createMainWindow();
  tray = new Tray(__dirname + "/profiler.png");
  tray.setToolTip("LaunchZorro");
  tray.setContextMenu(generateTrayMenu());
  tray.on("double-click", function() { mainWindow.show(); });
});

app.on("quit", function() {
  ConfigManager.save();
});

app.on("window-all-closed", function() {
  if(process.platform !== "darwin") {
    app.quit();
  }
});

function generateTrayMenu() {
  var recentMenuTemplate = [];
  for(var a = 0;a < recentProfiles.length;a++) {
    var profile = recentProfiles[a];
    (function(profile) {
      var item = {
        label: profile.lhc + "/" + profile.mouse + "/" + profile.category + "/" + profile.profile,
        click: function(menuItem, browserWindow, event) {
          var index = menuItem.menu.items.indexOf(menuItem);
          mainWindow.webContents.send("core", ["profile", "load", profile.lhc, profile.mouse, profile.category, profile.profile]);
        }
      };
      recentMenuTemplate.push(item);
    })(profile);
  }

  var menu = Menu.buildFromTemplate([
    { label: "Zorro v" + programInfo.version.toString(), enabled: false }, // Version
    { type: "separator" },
    { label: "Recent", submenu: recentMenuTemplate },
    { label: "Show", click: function() { mainWindow.show(); } }, // Show Zorro
    { label: "Editor", click: function() { createEditorWindow(); } }, // Show Editor
    { type: "separator" },
    { label: "Start Minimized", type: "checkbox", checked: ConfigManager._config.startMinimized, click: function(menuItem, browserWindow, event) {
      ConfigManager._config.startMinimized = !ConfigManager._config.startMinimized;
      menuItem.checked = ConfigManager._config.startMinimized;
    } },
    { label: "Quit", click: function() { // Quit App
      if(mainWindow) mainWindow.webContents.send("core", ["close"]);
      if(editorWindow) editorWindow.webContents.send("core", ["close"]);
    } }
  ]);
  return menu;
}

function createMainWindow() {
  if(!mainWindow) {
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 600,
      webPreferences: {
        backgroundThrottling: false
      }
    });

    mainWindow.loadURL("file://" + __dirname + "/index.html");
    mainWindow.maximize();
    if(ConfigManager._config.startMinimized) mainWindow.hide();

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
      case "RECENTPROFILES":
        recentProfiles = args[0];
        tray.setContextMenu(generateTrayMenu());
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
