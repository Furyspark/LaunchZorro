var ipcRenderer = require("electron").ipcRenderer;

ipcRenderer.on("extended-params", function(event, args) {
  Core.start(args);
});

function Core() {
  console.log("This is a static class.");
}

Core.start = function(args) {
  this.fillActionList();
}

Core.fillActionList = function() {
  
}

Core.addToPress = function() {
}

Core.addToRelease = function() {
}

window.addEventListener("load", function() {
  Core.start();
});
