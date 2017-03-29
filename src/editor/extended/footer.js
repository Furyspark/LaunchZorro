window.onbeforeunload = function(ev) {
  ipcRenderer.send("extended", ["getextended", Core.toRaw()]);
}
