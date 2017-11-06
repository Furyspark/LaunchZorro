var ipcRenderer = require("electron").ipcRenderer;
var bind = null;

ipcRenderer.on("initialize", function(event, args) {
  Core.baseData = args.baseData;
  bind = args.bind;
  Core.start();
});


window.$ = window.jQuery = require("../../lib/jquery.js");
require("../../lib/jquery-ui.js");
