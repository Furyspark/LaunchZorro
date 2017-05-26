var debugMode = false;

var programInfo = {
  version: {
    major: 0,
    minor: 3,
    build: 2,
    toString: function() {
      return this.major.toString() + "." + this.minor.toString() + "." + this.build.toString();
    }
  }
};


var fs = require("fs");

var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var Menu = electron.Menu;
var Tray = electron.Tray;

var baseDir = app.getPath("userData")

var recentProfiles = [];

var autostart = {
  mouse: "",
  lhc: "",
  category: "",
  profile: ""
};

function SetParameters(args) {
  // Launch parameters
  var mode = "";
  for(var a = 0;a < args.length;a++) {
    var argument = args[a];
    if(argument.toUpperCase() === "--DEBUG") debugMode = true;
    else if(argument.match(/\-\-CATEGORY\=([a-zA-Z0-9 ]+)/i)) autostart.category = RegExp.$1;
    else if(argument.match(/\-\-PROFILE\=([a-zA-Z0-9 ]+)/i)) autostart.profile = RegExp.$1;
    else if(argument.match(/\-\-MOUSE\=([a-zA-Z0-9 ]+)/i)) autostart.mouse = RegExp.$1;
    else if(argument.match(/\-\-LHC\=([a-zA-Z0-9 ]+)/i)) autostart.lhc = RegExp.$1;
  }
  // Load profile
  if(Core && Core.mainWindow) {
    StartProfile(autostart.mouse, autostart.lhc, autostart.category, autostart.profile, "cli");
    autostart.mouse = "";
    autostart.lhc = "";
    autostart.category = "";
    autostart.profile = "";
  }
}

SetParameters(process.argv);

var shouldQuit = app.makeSingleInstance(function(args, cwd) {
  SetParameters(args);
});

if(shouldQuit) {
  app.quit();
}

function StartProfile(mouse, lhc, category, profile, type) {
  if(category === "" || profile === "") return;
  if(!Core) return;
  if(!Core.mainWindow) return;
  Core.mainWindow.webContents.send("core", ["profile", "load", lhc, mouse, category, profile, type]);
}

var systemData = null;
fs.stat(__dirname + "/system.json", function(err, stats) {
  if(err) return;
  if(stats.isFile()) {
    fs.readFile(__dirname + "/system.json", function(err, data) {
      if(err) return;
      systemData = JSON.parse(data);
    });
  }
});

function Core() {}

Core.start = function() {
  this.recentProfiles = [];
  this.mainWindow = null;
  this.editorWindow = null;
  this.extendedBindWindow = null;
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
    },
    autoHideMenuBar: true,
    enableLargerThanScreen: true,
    show: false
  });

  this.mainWindow.loadURL("file://" + __dirname + "/index.html");
  if(!ConfigManager._config.startMinimized) {
    this.mainWindow.once("ready-to-show", function() {
      this.mainWindow.show();
      this.mainWindow.maximize();
      if(debugMode) this.mainWindow.webContents.openDevTools({mode: "detach"});
    }.bind(this));
  }

  this.mainWindow.on("closed", function() {
    this.mainWindow = null;
  }.bind(this));

  this.mainWindow.webContents.on("devtools-opened", function() {
    this.mainWindow.focus();
  }.bind(this));

  this.mainWindow.webContents.on("dom-ready", function() {
    this.mainWindow.webContents.send("core", [
      "basedata",
      {
        baseDir: baseDir
      }
    ]);
    if(autostart.mouse !== "" || autostart.lhc !== "" || autostart.category !== "" || autostart.profile !== "") {
      StartProfile(autostart.mouse, autostart.lhc, autostart.category, autostart.profile, "cli");
      autostart.mouse = "";
      autostart.lhc = "";
      autostart.category = "";
      autostart.profile = "";
    }
  }.bind(this));
}

Core.createEditorWindow = function() {
  if(!!this.editorWindow) {
    this.editorWindow.show();
    return;
  }

  this.editorWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    enableLargerThanScreen: true,
    backgroundColor: "#343434"
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

  this.editorWindow.webContents.on("dom-ready", function() {
    this.editorWindow.webContents.send("core", [
      "basedata",
      {
        baseDir: baseDir
      }
    ]);
  }.bind(this));
}

Core.createExtendedBindWindow = function(bind) {
  if(!!this.extendedBindWindow) {
    this.extendedBindWindow.show();
    this.extendedBindWindow.webContents.send("initialize", [bind]);
    return;
  }

  this.extendedBindWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    enableLargerThanScreen: true,
    backgroundColor: "#343434",
    resizable: false
  });

  this.extendedBindWindow.loadURL("file://" + __dirname + "/editor/extended.html");

  if(debugMode) this.extendedBindWindow.openDevTools({mode: "detach"});

  this.extendedBindWindow.on("closed", function() {
    this.extendedBindWindow = null;
  }.bind(this));

  this.extendedBindWindow.webContents.on("devtools-opened", function() {
    this.extendedBindWindow.focus();
  }.bind(this));

  this.extendedBindWindow.webContents.on("dom-ready", function() {
    this.extendedBindWindow.webContents.send("initialize", [bind]);
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
    { label: "Editor", click: function() { Core.createEditorWindow(); } }, // Show Editor
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
        if(args.length > 0) {
          Core.createExtendedBindWindow(args[0]);
        }
        break;
    }
  }
});

ipcMain.on("extended", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "GETEXTENDED":
        if(args.length > 0 && Core.editorWindow && Core.editorWindow.webContents) {
          Core.editorWindow.webContents.send("extended", ["set", args[0]]);
        }
        break;
    }
  }
});

