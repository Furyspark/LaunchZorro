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
    if(autostart.mouse !== "" || autostart.lhc !== "" || autostart.category !== "" || autostart.profile !== "") {
      StartProfile(autostart.mouse, autostart.lhc, autostart.category, autostart.profile);
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
