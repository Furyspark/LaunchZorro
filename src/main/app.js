//------------------------------------------------------------------------------
// App
//

app.on("ready", Core.start.bind(Core));

app.on("quit", function() {
  ConfigManager.save();
});
