ipcMain.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && Core.hasWindow("browser")) {
          Core.getWindow("browser").hide();
        }
        break;
      case "CLOSE":
        if(Core.hasWindow("browser")) Core.getWindow("browser").close();
        if(Core.hasWindow("editor")) Core.getWindow("editor").close();
        app.quit();
        break;
      case "EDITOR":
        if(args.length > 0 && args[0].toUpperCase() === "OPEN") Core.createWindow("editor");
        break;
      case "RECENTPROFILES":
        Core.recentProfiles = args[0];
        Core.refreshTray();
        break;
    }
  }
});

ipcMain.on("editor", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "SAVED":
        Core.getWindow("browser").send("core", ["profile", "reload"]);
        break;
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && Core.hasWindow("editor")) {
          Core.getWindow("editor").hide();
        }
        break;
      case "EXTENDED":
        if(args.length > 0) {
          let win = Core.createWindow("extendedBind");
          win.webContents.once("dom-ready", function() {
            win.webContents.send("initialize", { baseData: Core.getBaseData(), bind: args[0] });
          }.bind(this));
        }
        break;
    }
  }
});

ipcMain.on("extended", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "GETEXTENDED":
        if(args.length > 0 && Core.hasWindow("editor") && Core.getWindow("editor").webContents) {
          Core.getWindow("editor").webContents.send("extended", ["set", args[0]]);
        }
        break;
    }
  }
});

ipcMain.on("lowerprivileges", (ev) => {
  Core.lowerPrivileges()
  .catch((err) => { console.error(err); })
  .then(() => {
    Core.createTray();
  });
});
