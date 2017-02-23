ipcMain.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && Core.mainWindow) {
          Core.mainWindow.hide();
        }
        break;
      case "CLOSE":
        if(Core.mainWindow) Core.mainWindow.close();
        if(Core.editorWindow) Core.editorWindow.close();
        app.quit();
        break;
      case "EDITOR":
        if(args.length > 0 && args[0].toUpperCase() === "OPEN") Core.createEditorWindow();
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
        Core.mainWindow.send("core", ["profile", "reload"]);
        break;
      case "WINDOW":
        if(args.length > 0 && args[0].toUpperCase() === "HIDE" && Core.editorWindow) {
          Core.editorWindow.hide();
        }
        break;
      case "EXTENDED":

        break;
    }
  }
});
