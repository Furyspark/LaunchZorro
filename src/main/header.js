var debugMode = false;

let fs = require("fs");
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
