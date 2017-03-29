var ipcRenderer = require("electron").ipcRenderer;
var bind = null;

ipcRenderer.on("initialize", function(event, args) {
  bind = args[0];
  Core.start();
});


window.$ = window.jQuery = require(__dirname + "/../lib/jquery.js");
require(__dirname + "/../lib/jquery-ui.js");