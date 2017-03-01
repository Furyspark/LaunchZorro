var debugMode = false;

var programInfo = {
  version: {
    major: 0,
    minor: 2,
    build: 1,
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
      if(err) return;
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
// var interceptionJS = require("./interception/interception");

var recentProfiles = [];

// Launch parameters
for(var a = 2;a < process.argv.length;a++) {
  var argument = process.argv[a];
  if(argument.toUpperCase() === "DEBUG") debugMode = true;
}
