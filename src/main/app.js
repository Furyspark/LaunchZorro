//------------------------------------------------------------------------------
// App
//

app.on("ready", Core.start.bind(Core));

app.on("quit", function() {
  ConfigManager.save();
});

app.on("window-all-closed", function() {
  if(process.platform !== "darwin") {
    app.quit();
  }
});
