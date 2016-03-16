var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

// Reference to the main window object
var mainWindow = null;
// Reference to sub windows
var subWindows = [];

// Quit program when all windows are closed
app.on("window-all-closed", function() {
  if(process.platform != "darwin") {
    app.quit();
  }
});

// This method will be called when the application
// is ready to create a window
app.on("ready", function() {
  // Create main window
  mainWindow = new BrowserWindow({width: 1024, height: 384, autoHideMenuBar: true});

  // Load index.html in the main window
  mainWindow.loadURL("file://" + __dirname + "/index.html");

  // Open the devtools
  // mainWindow.webContents.openDevTools({detach: true});

  // Focus the main window when appropriate
  mainWindow.on("devtools-opened", function() {
    mainWindow.show();
  });

  // Emitted when the window is closed
  mainWindow.on("closed", function() {
    mainWindow = null;
    // Close all sub windows
    while(subWindows.length > 0) {
      subWindows.pop().close();
    }
  });
});
