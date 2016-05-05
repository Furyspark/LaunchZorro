var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.





// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  var mainWindow = new BrowserWindow({
    "type": "",
    "skipTaskbar": false,
    "center": true,
    "title": "launchzorro",
    "backgroundColor": "#000000",
    "autoHideMenuBar": false,
    "width": 1024,
    "kiosk": false,
    "show": true,
    "transparent": false,
    "fullscreen": false,
    "enableLargerThanScreen": false,
    "frame": true,
    "webPreferences": {
        "experimentalFeatures": false,
        "partition": "",
        "experimentalCanvasFeatures": false,
        "javascript": true,
        "allowDisplayingInsecureContent": false,
        "textAreasAreResizable": true,
        "images": true,
        "plugins": false,
        "nodeIntegration": true,
        "preload": "",
        "zoomFactor": 1.0,
        "webaudio": true,
        "allowRunningInsecureContent": false,
        "webSecurity": true,
        "blinkFeatures": "",
        "webgl": true,
        "directWrite": true
    },
    "useContentSize": false,
    "maxHeight": "",
    "maxWidth": "",
    "resizable": false,
    "icon": "profiler.png",
    "exeIcon": "",
    "minHeight": "",
    "y": 100,
    "titleBarStyle": "default",
    "minWidth": "",
    "darkTheme": false,
    "height": 384,
    "macIcon": "",
    "acceptFirstMouse": false,
    "disableAutoHideCursor": false,
    "alwaysOnTop": false,
    "x": 100
});
  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.webContents.setUserAgent("");

  mainWindow.webContents.on('did-finish-load',function(){
    mainWindow.setTitle("launchzorro");
    // mainWindow.webContents.openDevTools({ mode: "detach" });
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
