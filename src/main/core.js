function Core() {}

Core.start = function() {
  this.recentProfiles = [];
  this._windows = {};
  this.initFileStructure(errors => {
    if(errors.length > 0) console.log(errors);
    else Core.postStart();
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
  Core.copyFile(nodePath.join(__dirname, "whitelist.json"), nodePath.join(baseDir, "whitelist.json"), true, err => {
    if(err) taskDone(err);
    else taskDone();
  });
  // Copy base icons
  ncp(__dirname + "/baseicons", baseDir + "/icons", err => {
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
  this.createTray();

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
    win.loadURL(this.getWindowURL(type));
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
      return nodePath.join(__dirname, "windows/browser", "index.html");
      break;
    case "editor":
      return nodePath.join(__dirname, "windows/editor", "index.html");
      break;
    case "extendedBind":
      return nodePath.join(__dirname, "windows/editor", "extended.html");
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
    rootDir: __dirname
  };
};

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
