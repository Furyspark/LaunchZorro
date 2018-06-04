var fs = require("fs");
var path = require("path");
var concat = require("concatenate-files");
var packager = require("electron-packager");
var packageJSON = fs.readFileSync("package.json");
var resultPackage = JSON.parse(packageJSON);
if(resultPackage.build) delete resultPackage.build;
if(resultPackage.devDependencies) delete resultPackage.devDependencies;
if(resultPackage.scripts) delete resultPackage.scripts;

var replaceFiles = [
  { from: "replace/main.js", to: "/resources/app/main.js" }
];

var packagerOptions = {
  dir: ".",
  icon: "profiler.ico",
  ignore: [
    /[\\\/]icons$/i,
    /compile\..+/i,
    /profiler\.ico/i,
    /readme\.md/i,
    /sources\.json/i,
    /recent\.json/i,
    /src$/i,
    /replace$/,
    /[\\\/]profiles$/,
    /conf\.json/,
    // /core-config\.json/,
    /(.+)\.sublime-(.+)/,
    /workplace$/,
    /gulpfile\.js$/i,
    /.*\.lock/i
  ],
  afterCopy: [
    function(buildPath, electronVersion, platform, arch, callback) {
      var pathArr = buildPath.split(/[\\\/]/);
      var electronPath = pathArr.slice(0, -2).join("\/") + "/";
      // Create package.json
      fs.writeFileSync(electronPath + "/package.json", JSON.stringify(resultPackage, null, 2));
      // Rename stuff
      fs.renameSync(buildPath + "/interception.dll", electronPath + "interception.dll");
      // fs.renameSync(buildPath + "/devices.json", electronPath + "devices.json");
      // fs.renameSync(buildPath + "/lib", electronPath + "lib");
      // Create system file
      var obj = {
        arch: arch,
        platform: platform,
        electronVersion: electronVersion
      };
      // Call callback
      callback();
    }
  ],
  arch: "x64",
  name: "Zorro",
  out: "bin",
  platform: "win32",
  electronVersion: "2.0.2"
};

function copyFile(src, dest, callback) {
  var source = fs.createReadStream(src);
  var destination = fs.createWriteStream(dest);
  source.pipe(destination, { end: false });
  source.on("end", function() {
    if(callback) callback();
  });
}

function PackageApp() {
  packager(packagerOptions, function(err, appPaths) {
    if(err) console.log(err);
    for(var a = 0;a < appPaths.length;a++) {
      var appPath = appPaths[a];
    }
  });
}


PackageApp();
