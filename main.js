var debugMode = false;

let fs = require("fs");
let os = require("os");
let nodePath = require("path");
var ncp = require("ncp").ncp;

var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipcMain = electron.ipcMain;
var Menu = electron.Menu;
var Tray = electron.Tray;

let packageInfo = JSON.parse(fs.readFileSync("package.json"));
var baseDir = app.getPath("userData").replace(/\\/g, "/")
var appDir = __dirname;

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
        if(argument === "--debug") debugMode = true;
        else if(argument.match(/\-\-CATEGORY\=([a-zA-Z0-9 ]+)/i)) autostart.category = RegExp.$1;
        else if(argument.match(/\-\-PROFILE\=([a-zA-Z0-9 ]+)/i)) autostart.profile = RegExp.$1;
        else if(argument.match(/\-\-MOUSE\=([a-zA-Z0-9 ]+)/i)) autostart.mouse = RegExp.$1;
        else if(argument.match(/\-\-LHC\=([a-zA-Z0-9 ]+)/i)) autostart.lhc = RegExp.$1;
    }
    // Load profile
    if(Core && Core.hasWindow && Core.hasWindow("browser")) {
        StartProfile(autostart.mouse, autostart.lhc, autostart.category, autostart.profile, "cli");
        autostart.mouse = "";
        autostart.lhc = "";
        autostart.category = "";
        autostart.profile = "";
    }
}

var shouldQuit = app.makeSingleInstance(function(args, cwd) {
    SetParameters(args);
});

if(shouldQuit) {
    app.quit();
}
else {
    SetParameters(process.argv);
}

function StartProfile(mouse, lhc, category, profile, type) {
    if(category === "" || profile === "") return;
    if(!Core) return;
    if(!Core.hasWindow("browser")) return;
    Core.getWindow("browser").webContents.send("core", ["profile", "load", lhc, mouse, category, profile, type]);
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

Core.dirs = {
  appRoot: app.getAppPath(),
  electronRoot: nodePath.resolve("."),
  appData: os.platform() === "win32" ? process.env.APPDATA + "/zorro" : nodePath.resolve(".")
};

Core.start = function() {
  ConfigManager.load()
  .catch((err) => { console.error(err); })
  .then(() => {
    this.recentProfiles = [];
    this._windows = {};
    this.initFileStructure(errors => {
      if(errors.length > 0) console.log(errors);
      else Core.postStart();
    });
  });
};

Core.initFileStructure = function(callback) {
  let tasks = 2;
  let errors = [];
  let taskDone = function(err) {
    tasks--;
    if(err) errors.push(err);
    if(tasks === 0) callback(errors);
  };
  // Copy base whitelist
  Core.copyFile(nodePath.join(__dirname, "whitelist.json"), nodePath.join(Core.dirs.appData, "whitelist.json"), true, err => {
    if(err) taskDone(err);
    else taskDone();
  });
  // Copy base icons
  ncp(__dirname + "/baseicons", Core.dirs.appData + "/icons", err => {
    if(err) taskDone(err);
    else taskDone();
  });
};

Core.copyFile = function(src, dest, overwrite, callback) {
  fs.readFile(src, (err, data) => {
    if(err) callback(err);
    fs.stat(dest, (err, stat) => {
      if(err && err.code !== "ENOENT") callback(err);
      else if(err && err.code === "ENOENT") {
        fs.writeFile(dest, data, (err) => {
          if(err) callback(err);
          callback();
        });
      }
      else {
        if(err && err.code === "ENOENT" && overwrite) {
          fs.writeFile(dest, data, (err) => {
            if(err) callback(err);
            callback();
          });
        }
        else {
          callback();
        }
      }
    });
  });
};

Core.postStart = function() {
  this.createWindow("browser");

  app.on("window-all-closed", function() {
    if(process.platform !== "darwin") {
      app.quit();
    }
  });
};

Core.isDebugMode = function() {
  return debugMode;
};

Core.hasWindow = function(type) {
  return this._windows[type] != null;
};

Core.getWindow = function(type) {
  return this._windows[type];
};

Core.createWindow = function(type) {
  // Show window if window already exists
  if(this._windows[type]) {
    this._windows[type].show();
    return this._windows[type];
  }
  // Create window if it doesn't exist yet
  else {
    // Create window
    let win = this._windows[type] = new BrowserWindow(this.getWindowBaseProperties(type));

    // Load URL
    win.loadFile(this.getWindowURL(type));
    win.setMenu(null);

    // Configure window
    this.configureWindow(win, type);

    // Remove reference to window upon closing
    win.on("closed", function() {
      this._windows[type] = null;
    }.bind(this));

    // Make devtools appear below its window initially
    win.webContents.on("devtools-opened", function() {
      win.focus();
    }.bind(this));
    return win;
  }
  return undefined;
};

Core.getWindowBaseProperties = function(type) {
  let result = {};

  switch(type) {
    case "browser":
      result.width = 1024;
      result.height = 600;
      result.webPreferences = { backgroundThrottling: false };
      result.show = false;
      break;
    case "editor":
      result.width = 1024;
      result.height = 768;
      result.backgroundColor = "#343434";
      result.show = false;
      break;
    case "extendedBind":
      result.width = 800;
      result.height = 600;
      result.backgroundColor = "#343434";
      result.resizable = false;
      result.show = false;
      // result.parent = this._windows.editor;
      break;
  }

  return result;
};

Core.getWindowURL = function(type) {
  switch(type) {
    case "browser":
      return nodePath.join(this.dirs.appRoot, "windows/browser", "index.html");
      break;
    case "editor":
      return nodePath.join(this.dirs.appRoot, "windows/editor", "index.html");
      break;
    case "extendedBind":
      return nodePath.join(this.dirs.appRoot, "windows/editor", "extended.html");
      break;
  }
};

Core.configureWindow = function(win, type) {
  switch(type) {
    // Browser window specific settings
    case "browser":
      if(!ConfigManager._config.startMinimized) {
        win.once("ready-to-show", function() {
          win.show();
          win.maximize();
          if(this.isDebugMode()) win.webContents.openDevTools({ mode: "detach" });
        }.bind(this));
      }

      win.webContents.once("dom-ready", function() {
        win.webContents.send("core", ["basedata", this.getBaseData()]);
        if(autostart.mouse !== "" || autostart.lhc !== "" || autostart.category !== "" || autostart.profile !== "") {
          StartProfile(autostart.mouse, autostart.lhc, autostart.category, autostart.profile, "cli");
          autostart.mouse = "";
          autostart.lhc = "";
          autostart.category = "";
          autostart.profile = "";
        }
      }.bind(this));
      break;
    // Editor window specific settings
    case "editor":
      win.once("ready-to-show", function() {
        win.show();
        win.maximize();
        if(this.isDebugMode()) win.webContents.openDevTools({ mode: "detach" });
      }.bind(this));

      win.webContents.once("dom-ready", function() {
        win.webContents.send("core", ["basedata", this.getBaseData()]);
      }.bind(this));
      break;
    // Extended bind window specific settings
    case "extendedBind":
      win.once("ready-to-show", function() {
        win.show();
        if(this.isDebugMode()) win.webContents.openDevTools({ mode: "detach" });
      }.bind(this));
      break;
  }
};

Core.getBaseData = function() {
  return {
    baseDir: baseDir,
    rootDir: __dirname,
    dirs: this.dirs
  };
};

Core.createTray = function() {
  this.tray = new Tray(this.dirs.electronRoot + "/profiler.png");
  this.tray.setToolTip("Zorro");
  this.tray.setContextMenu(this.generateTrayMenu());
  this.tray.on("double-click", function() { Core.createWindow("browser"); }.bind(this));
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
          Core.getWindow("browser").webContents.send("core", ["profile", "load", profile.lhc, profile.mouse, profile.category, profile.profile]);
        }
      };
      recentMenuTemplate.push(item);
    })(profile);
  }

  var menu = Menu.buildFromTemplate([
    { label: "Zorro v" + packageInfo.version, enabled: false }, // Version
    { type: "separator" },
    { label: "Recent", submenu: recentMenuTemplate },
    { label: "Show", click: function() { Core.createWindow("browser"); } }, // Show Zorro
    { label: "Editor", click: function() { Core.createWindow("editor"); } }, // Show Editor
    { type: "separator" },
    { label: "Start Minimized", type: "checkbox", checked: ConfigManager._config.startMinimized, click: function(menuItem, browserWindow, event) {
      ConfigManager._config.startMinimized = !ConfigManager._config.startMinimized;
      menuItem.checked = ConfigManager._config.startMinimized;
    } },
    { label: "Quit", click: function() { // Quit App
      if(Core.hasWindow("browser")) Core.getWindow("browser").webContents.send("core", ["close"]);
      if(Core.hasWindow("editor")) Core.getWindow("editor").webContents.send("core", ["close"]);
    } }
  ]);
  return menu;
}

Core.lowerPrivileges = function() {
  return new Promise((resolve, reject) => {
    if(os.platform() === "win32") {
      resolve();
      return;
    }
    else {
      fs.readFile(this.dirs.electronRoot + "/user.json", (err, data) => {
        if(err) {
          reject(err);
        }
        else {
          let user = JSON.parse(data.toString());
          try {
            process.setgid(user.group);
            process.setuid(user.name);
            console.log("Successfully dropped privileges");
            resolve();
          }
          catch(err) {
            console.error("Couldn't drop privileges! Be very careful!");
            reject();
          }
        }
      });
    }
  });
};

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
  fs.writeFile(this.getFileLocation(), JSON.stringify(this._config), (err) => {
    if(err) console.error(err);
  });
}

ConfigManager.load = function() {
  return new Promise((resolve, reject) => {
    fs.stat(ConfigManager.getFileLocation(), function(err, stats) {
      if(err && err.code !== "ENOENT") {
        reject(err);
        return;
      }
      else if(err && err.code === "ENOENT") {
        ConfigManager.generateConfig();
        resolve();
      }
      else {
        if(stats.isFile()) {
          fs.readFile(ConfigManager.getFileLocation(), function(err, data) {
            if(err) {
              reject(err);
              return;
            }
            this._config = JSON.parse(data);
            resolve();
          });
        }
      }
    });
  });

  // var stats;
  // try {
    // stats = fs.statSync(ConfigManager.getFileLocation());
  // } catch(e) {
    // // if(e) console.log(e);
  // } finally {
    // if(stats && stats.isFile()) this._config = JSON.parse(fs.readFileSync(ConfigManager.getFileLocation()));
    // else ConfigManager.generateConfig();
  // }
}

ConfigManager.getFileLocation = function() {
  return Core.dirs.electronRoot + "/core-config.json";
};

//------------------------------------------------------------------------------
// App
//

app.on("ready", Core.start.bind(Core));

app.on("quit", function() {
  ConfigManager.save();
});

ipcMain.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && Core.hasWindow("browser")) {
          Core.getWindow("browser").hide();
        }
        break;
      case "CLOSE":
        if(Core.hasWindow("browser")) Core.getWindow("browser").close();
        if(Core.hasWindow("editor")) Core.getWindow("editor").close();
        app.quit();
        break;
      case "EDITOR":
        if(args.length > 0 && args[0].toUpperCase() === "OPEN") Core.createWindow("editor");
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
        Core.getWindow("browser").send("core", ["profile", "reload"]);
        break;
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && Core.hasWindow("editor")) {
          Core.getWindow("editor").hide();
        }
        break;
      case "EXTENDED":
        if(args.length > 0) {
          let win = Core.createWindow("extendedBind");
          win.webContents.once("dom-ready", function() {
            win.webContents.send("initialize", { baseData: Core.getBaseData(), bind: args[0] });
          }.bind(this));
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
        if(args.length > 0 && Core.hasWindow("editor") && Core.getWindow("editor").webContents) {
          Core.getWindow("editor").webContents.send("extended", ["set", args[0]]);
        }
        break;
    }
  }
});

ipcMain.on("lowerprivileges", (ev) => {
  Core.lowerPrivileges()
  .catch((err) => { console.error(err); })
  .then(() => {
    Core.createTray();
  });
});

