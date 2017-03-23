var debugMode = false;

var programInfo = {
  version: {
    major: 0,
    minor: 2,
    build: 3,
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
    console.log(autostart);
    StartProfile(autostart.mouse, autostart.lhc, autostart.category, autostart.profile);
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

function StartProfile(mouse, lhc, category, profile) {
  if(mouse === "" || lhc === "" || category === "" || profile === "") return;
  if(!Core) return;
  if(!Core.mainWindow) return;
  Core.mainWindow.webContents.send("core", ["profile", "load", lhc, mouse, category, profile]);
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