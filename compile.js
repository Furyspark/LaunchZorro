var fs = require("fs");
var concat = require("concatenate-files");
var packager = require("electron-packager");
var packagerOptions = {
  dir: ".",
  arch: "x64",
  icon: "profiler.ico",
  ignore: [
    /compile.+/i,
    /profiler\.ico/i,
    /readme\.md/i,
    /sources\.json/i,
    /src/i
  ],
  afterCopy: [
    function(buildPath, electronVersion, platform, arch, callback) {
      var pathArr = buildPath.split(/[\\\/]/);
      var electronPath = pathArr.slice(0, -2).join("\/") + "/";
      fs.renameSync(buildPath + "/interception.dll", electronPath + "interception.dll");
      fs.renameSync(buildPath + "/devices.json", electronPath + "devices.json");
      fs.renameSync(buildPath + "/conf.json", electronPath + "conf.json");
      callback();
    }
  ],
  name: "LaunchZorro",
  out: "bin",
  platform: "win32",
  version: "1.3.5"
};

var sources = JSON.parse(fs.readFileSync("sources.json"));

concat(sources, "app.js", {}, function() {
  packager(packagerOptions, function(err, appPaths) {
    if(err) console.log(err);
  });
});
