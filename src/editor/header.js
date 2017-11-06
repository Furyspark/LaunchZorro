var fs = require("fs");
var path = require("path");
var dialog = require("electron").remote.dialog;
var ipcRenderer = require("electron").ipcRenderer;

window.$ = window.jQuery = require("jquery");

ipcRenderer.on("dialog-closed", function(event, arg) {
  if(arg === "extended") {
    Core.dialogOpen = false;
    Core.waitForInput.awaitingExtended = false;
  }
});
