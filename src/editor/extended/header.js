var ipcRenderer = require("electron").ipcRenderer;

ipcRenderer.on("extended-params", function(event, args) {
  Core.start(args);
});
