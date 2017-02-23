var debugMode = false;

var programInfo = {
  version: {
    major: 0,
    minor: 1,
    build: 7,
    toString: function() {
      return this.major.toString() + "." + this.minor.toString() + "." + this.build.toString();
    }
  }
};


var fs = require("fs");

var systemData = null;
fs.stat(__dirname + "/system.json", function(err, stats) {
  if(err) {
    console.log(err);
    return;
  }
  if(stats.isFile()) {
    fs.readFile(__dirname + "/system.json", function(err, data) {
      if(err) {
        console.log(err);
        return;
      }
      systemData = JSON.parse(data);
    });
  }
});

var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var Menu = electron.Menu;
var Tray = electron.Tray;
var interceptionJS = require("./interception/interception");

var recentProfiles = [];

// Launch parameters
for(var a = 2;a < process.argv.length;a++) {
  var argument = process.argv[a];
  if(argument.toUpperCase() === "DEBUG") debugMode = true;
}

function Core() {}

Core.start = function() {
  this.recentProfiles = [];
  this.mainWindow = null;
  this.editorWindow = null;
  this.createMainWindow();
  this.createTray();
}

Core.createMainWindow = function() {
  if(!!this.mainWindow) return;
  this.mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      backgroundThrottling: false
    }
  });

  this.mainWindow.loadURL("file://" + __dirname + "/index.html");
  this.mainWindow.maximize();
  if(ConfigManager._config.startMinimized) this.mainWindow.hide();

  if(debugMode) this.mainWindow.webContents.openDevTools({mode: "detach"});

  this.mainWindow.on("closed", function() {
    this.mainWindow = null;
  }.bind(this));

  this.mainWindow.webContents.on("devtools-opened", function() {
    this.mainWindow.focus();
  }.bind(this));
}

Core.createEditorWindow = function() {
  if(!!this.editorWindow) {
    this.editorWindow.show();
    return;
  }

  this.editorWindow = new BrowserWindow({
    width: 1024,
    height: 768
  });

  this.editorWindow.loadURL("file://" + __dirname + "/editor/index.html");
  this.editorWindow.maximize();

  if(debugMode) this.editorWindow.openDevTools({mode: "detach"});

  this.editorWindow.on("closed", function() {
    this.editorWindow = null;
  }.bind(this));

  this.editorWindow.webContents.on("devtools-opened", function() {
    this.editorWindow.focus();
  }.bind(this));
}

Core.createTray = function() {
  this.tray = new Tray(__dirname + "/profiler.png");
  this.tray.setToolTip("Zorro");
  this.tray.setContextMenu(this.generateTrayMenu());
  this.tray.on("double-click", function() { this.mainWindow.show(); }.bind(this));
}

Core.refreshTray = function() {
  this.tray.setContextMenu(this.generateTrayMenu());
}

Core.generateTrayMenu = function() {
  var recentMenuTemplate = [];
  for(var a = 0;a < Core.recentProfiles.length;a++) {
    var profile = Core.recentProfiles[a];
    (function(profile) {
      var item = {
        label: profile.lhc + "/" + profile.mouse + "/" + profile.category + "/" + profile.profile,
        click: function(menuItem, browserWindow, event) {
          var index = menuItem.menu.items.indexOf(menuItem);
          Core.mainWindow.webContents.send("core", ["profile", "load", profile.lhc, profile.mouse, profile.category, profile.profile]);
        }
      };
      recentMenuTemplate.push(item);
    })(profile);
  }

  var menu = Menu.buildFromTemplate([
    { label: "Zorro v" + programInfo.version.toString(), enabled: false }, // Version
    { type: "separator" },
    { label: "Recent", submenu: recentMenuTemplate },
    { label: "Show", click: function() { Core.mainWindow.show(); } }, // Show Zorro
    { label: "Editor", click: function() { createEditorWindow(); } }, // Show Editor
    { type: "separator" },
    { label: "Start Minimized", type: "checkbox", checked: ConfigManager._config.startMinimized, click: function(menuItem, browserWindow, event) {
      ConfigManager._config.startMinimized = !ConfigManager._config.startMinimized;
      menuItem.checked = ConfigManager._config.startMinimized;
    } },
    { label: "Quit", click: function() { // Quit App
      if(Core.mainWindow) Core.mainWindow.webContents.send("core", ["close"]);
      if(Core.editorWindow) Core.editorWindow.webContents.send("core", ["close"]);
    } }
  ]);
  return menu;
}

//------------------------------------------------------------------------------
// ConfigManager
//

function ConfigManager() {}

ConfigManager._config = {};

ConfigManager.generateConfig = function() {
  this._config = {
    startMinimized: false
  };
}

ConfigManager.save = function() {
  fs.writeFileSync("core-config.json", JSON.stringify(this._config));
}

ConfigManager.load = function() {
  fs.stat("core-config.json", function(err, stats) {
    if(err) {
      console.log(err);
      return;
    }
    if(stats.isFile()) {
      fs.readFile("core-config.json", function(err, data) {
        if(err) {
          console.log(err);
          return;
        }
        this._config = JSON.parse(data);
      });
    }
  });

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

//------------------------------------------------------------------------------
// App
//

app.on("ready", Core.start.bind(Core));

app.on("quit", function() {
  ConfigManager.save();
});

app.on("window-all-closed", function() {
  if(process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && Core.mainWindow) {
          Core.mainWindow.hide();
        }
        break;
      case "CLOSE":
        if(Core.mainWindow) Core.mainWindow.close();
        if(Core.editorWindow) Core.editorWindow.close();
        app.quit();
        break;
      case "EDITOR":
        if(args.length > 0 && args[0].toUpperCase() === "OPEN") Core.createEditorWindow();
        break;
      case "RECENTPROFILES":
        Core.recentProfiles = args[0];
        Core.refreshTray();
        break;
    }
  }
});

ipcMain.on("editor", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "SAVED":
        Core.mainWindow.send("core", ["profile", "reload"]);
        break;
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && Core.editorWindow) {
          Core.editorWindow.hide();
        }
        break;
      case "EXTENDED":

        break;
    }
  }
});

