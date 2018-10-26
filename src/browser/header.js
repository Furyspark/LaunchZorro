let os = require("os");
let fs = require("fs");
let path = nodePath = require("path");
let spawn = require("child_process").spawn;
let exec = require("child_process").execFile;
let interceptionJS;
let grabzorro;
let processType = "electron";
let electron = require("electron");
let ipcRenderer = electron.ipcRenderer;
let SocketIOServer = require("socket.io");
let $ = jQuery = require("jquery");
let ncp = require("ncp").ncp;

let cmdArgs = {
  lhc: "",
  mouse: "",
  category: "",
  profile: ""
};

process.argv.forEach(function(value, index) {
  if(index > 1) {
    if(value.match(/lhc=([\w- ]+)/i)) {
      cmdArgs.lhc = RegExp.$1;
    }
    else if(value.match(/mouse=([\w- ]+)/i)) {
      cmdArgs.mouse = RegExp.$1;
    }
    else if(value.match(/category=([\w- ]+)/i)) {
      cmdArgs.category = RegExp.$1;
    }
    else if(value.match(/profile=([\w- ]+)/i)) {
      cmdArgs.profile = RegExp.$1;
    }
  }
});
