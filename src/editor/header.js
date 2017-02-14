var fs = require("fs");
var path = require("path");
var dialog = require("electron").remote.dialog;
var ipcRenderer = require("electron").ipcRenderer;

window.$ = window.jQuery = require(__dirname + "/../lib/jquery.js");
require(__dirname + "/../lib/jquery-ui.js");

ipcRenderer.on("dialog-closed", function(event, arg) {
  if(arg === "extended") {
    Core.dialogOpen = false;
    Core.waitForInput.awaitingExtended = false;
  }
});
