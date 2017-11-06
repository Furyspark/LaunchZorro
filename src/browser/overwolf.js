function Overwolf() {}

Overwolf.server = null;
Overwolf.port = 11994;
Overwolf.socket = null;

Overwolf.onChange = function() {
  var elem = document.getElementById("checkbox-overwolf-server");
  if(elem.checked) {
    Core.conf.linkOverwolf = true;
    this.startServer();
  } else {
    Core.conf.linkOverwolf = false;
    this.stopServer();
  }
  Core.saveConfig();
}

Overwolf.startServer = function() {
  if(!!this.server) return;
  this.server = new SocketIOServer(this.port);
  this.server.on("connection", this.onConnection);
}

Overwolf.stopServer = function() {
  if(!this.server) return;
  this.server.close();
  this.server = null;
  this.socket = null;
}

Overwolf.onConnection = function(socket) {
  Overwolf.socket = socket;
  socket.on("disconnect", Overwolf.onDisconnect);
}

Overwolf.onDisconnect = function() {
  Overwolf.socket = null;
}

Overwolf.isActive = function() {
  return !!this.server;
}

Overwolf.sendMessage = function(msg, active) {
  if(!this.isActive()) return;
  var data = { msg: msg, active: active };
  this.server.sockets.emit("profileMsg", data);
}
