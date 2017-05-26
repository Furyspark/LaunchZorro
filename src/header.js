var fs = require("fs");
var path = require("path");
var spawn = require("child_process").spawn;
var exec = require("child_process").execFile;
var interceptionJS = require("./interception/interception");
var processType = "electron";
var electron = require("electron");
var ipcRenderer = electron.ipcRenderer;
var SocketIOServer = require("socket.io");
var $ = jQuery = require("./lib/jquery.js");

var cmdArgs = {
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
