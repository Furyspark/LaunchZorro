var fs = require("fs");
var path = require("path");
var concat = require("concatenate-files");
var packager = require("electron-packager");

var replaceFiles = [
  { from: "replace/main.js", to: "/resources/app/main.js" }
];

var packagerOptions = {
  dir: ".",
  arch: "x64",
  icon: "profiler.ico",
  ignore: [
    /compile.+/i,
    /profiler\.ico/i,
    /readme\.md/i,
    /sources\.json/i,
    /src$/i,
    /replace$/,
    /main\.js$/,
    /profiles$/,
    /conf\.json/
  ],
  afterCopy: [
    function(buildPath, electronVersion, platform, arch, callback) {
      var pathArr = buildPath.split(/[\\\/]/);
      var electronPath = pathArr.slice(0, -2).join("\/") + "/";
      fs.renameSync(buildPath + "/interception.dll", electronPath + "interception.dll");
      fs.renameSync(buildPath + "/devices.json", electronPath + "devices.json");
      fs.renameSync(buildPath + "/profiler", electronPath + "profiler");
      fs.renameSync(buildPath + "/icons", electronPath + "icons");
      callback();
    }
  ],
  name: "LaunchZorro",
  out: "bin",
  platform: "win32",
  version: "1.4.2"
};

function copyFile(src, dest, callback) {
  var source = fs.createReadStream(src);
  var destination = fs.createWriteStream(dest);
  source.pipe(destination, { end: false });
  source.on("end", function() {
    if(callback) callback();
  });
}

var sources = [
  "src/header.js",
  "src/signal.js",
  "src/input.js",
  "src/core.js",
  "src/keymap.js",
  "src/bind.js",
  "src/sequence.js",
  "src/action.js",
  "src/categories.js",
  "src/profiles.js",
  "src/audio.js",
  "src/profile.js",
  "src/footer.js"
];

var editorSources = [
  "src/editor/header.js",
  "src/editor/core.js",
  "src/editor/saver.js",
  "src/editor/classes/profile.js",
  "src/editor/classes/keymap.js",
  "src/editor/classes/bind.js",
  "src/editor/classes/button_layout.js",
  "src/editor/classes/button.js",
  "src/editor/footer.js"
];

var fileCount = 2;
concat(sources, "app.js", {}, function() {
  fileCount--;
  if(fileCount === 0) {
    Package();
  }
});

concat(editorSources, "editor/app.js", {}, function() {
  fileCount--;
  if(fileCount === 0) {
    Package();
  }
});

function Package() {
  packager(packagerOptions, function(err, appPaths) {
    if(err) console.log(err);
    for(var a = 0;a < appPaths.length;a++) {
      var appPath = appPaths[a];
      for(var b = 0;b < replaceFiles.length;b++) {
        var replaceFile = replaceFiles[b];
        copyFile(replaceFile.from, appPath + replaceFile.to);
      }
    }
  });
}
