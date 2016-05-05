var fs = require("fs");
var path = require("path");
var spawn = require("child_process").spawn;
var exec = require("child_process").execFile;

var $Core = {};

$Core.devices = {};
$Core.devices.lhc = {};
$Core.devices.mice = {};
$Core.devices.list = JSON.parse(fs.readFileSync("devices.json"));
$Core.conf = {};

window.onload = function() {
  $Audio.addSound("reload", "assets/audio/profiler_reload.wav");
  $Audio.addSound("unload", "assets/audio/profiler_unload.wav");
  $Audio.addSound("refresh", "assets/audio/profiler_refresh.wav");
  $Core.start();
  // Load conf.json
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.addEventListener("load", function(e) {
    $Core.conf = JSON.parse(this.responseText);
    $Core.onConfLoaded();
  });
  xhr.open("GET", "conf.json");
  xhr.send();
};

$Core.start = function() {
  // Add Left-Handed Controllers to the list of devices
  var groups = ["lhc", "mice"];
  for(var a = 0;a < groups.length;a++) {
    var groupName = groups[a];
    var group = $Core.devices.list[groupName];
    for(var b = 0;b < group.length;b++) {
      var device = group[b];

      // Create element
      var elem = $Core.addRadioButton("group_" + groupName, device.dirName, groupName, device.name);
      // Add click event
      if(groupName === "lhc") {
        elem.onchange = function() {
          $Core.selectLHC(this.firstChild.value);
        };
      } else if(groupName === "mice") {
        elem.onchange = function() {
          $Core.selectMouse(this.firstChild.value);
        };
      }

      // Set default check
      elem.firstChild.checked = false;
      if(b === 0) {
        elem.firstChild.checked = true;
      }

      // Append to list
      var obj = {
        name: device.name,
        dirName: device.dirName,
        element: elem
      };
      $Core.devices[groupName][device.dirName] = obj;
    }
  }

  $Categories.refresh();
};

$Core.onConfLoaded = function() {
  var conf = $Core.conf;
  if(conf.autocapsf13) {
    $Profiles.launchCapsF13();
  }
};

$Core.selectLHC = function(value) {
  $Profiles.clear();
  $Categories.refresh();
};

$Core.selectMouse = function(value) {
  $Profiles.clear();
  $Categories.refresh();
};

$Core.LHCElement = function() {
  for(var a in $Core.devices.lhc) {
    var elem = $Core.devices.lhc[a].element.firstChild;
    if(elem.checked) {
      return elem;
    }
  }
};

$Core.MouseElement = function() {
  for(var a in $Core.devices.mice) {
    var elem = $Core.devices.mice[a].element.firstChild;
    if(elem.checked) {
      return elem;
    }
  }
};

$Core.addRadioButton = function(parentId, key, groupKey, text) {
  var li = document.createElement("li");

  var label = document.createElement("label");
  li.appendChild(label);

  var elem = document.createElement("input");
  elem.type = "radio";
  elem.value = key;
  elem.name = groupKey;

  label.appendChild(elem);
  label.innerHTML += text;

  var parent = document.getElementById(parentId);
  parent.appendChild(li);

  return label;
};

$Core.unloadProfile = function() {
  if($Profiles.profile) {
    $Profiles.profile.kill();
    $Profiles.setProfileInfo("N/A");
  }
  $Audio.play("unload");
};

$Core.reloadProfile = function() {
  $Profiles.loadProfile();
  $Audio.play("reload");
};

$Core.refreshProfiles = function() {
  $Categories.refresh();
  $Profiles.refresh();
  $Audio.play("refresh");
};

$Core.detectRunning = function() {
  var tasklist = spawn("tasklist");
  var taskStr = "";
  tasklist.stdout.on("data", function(data) {
    taskStr += data.toString();
  });
  tasklist.stdout.on("end", function() {
    var tasks = taskStr.split(/[\n\r]+/);
    tasks = $Core.parseTasks(tasks.slice(4));
  });
}

$Core.parseTasks = function(tasks) {
  var result = [];
  for(var a = 0;a < tasks.length;a++) {
    var task = tasks[a];
    var taskDetails = task.split(/[ ]+/);
    var obj = {
      exe: taskDetails[0]
    };
    result.push(obj);
  }
  return result;
}
var $Categories = {};

$Categories.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Categories.add = function(name) {
  var elem = document.createElement("option");
  elem.value = name;
  elem.innerHTML = name;
  this.getElement().appendChild(elem);
};

$Categories.refresh = function() {
  this.clear();
  var cats = this.getCategoryDirectories();
  for(var a = 0;a < cats.length;a++) {
    var cat = cats[a];
    this.add(cat);
  }
};

$Categories.getCategoryDirectories = function() {
  var baseDir = this.baseDir();
  return fs.readdirSync(baseDir).filter(function(file) {
    return fs.lstatSync(path.resolve(baseDir, file)).isDirectory();
  });
};

$Categories.getElement = function() {
  return document.getElementById("profiles_categories");
};

$Categories.getSelected = function() {
  var parent = this.getElement();
  return parent.options[parent.selectedIndex];
};

$Categories.baseDir = function() {
  var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
  var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
  return "profiles/" + mouseDir + "/" + lhcDir + "/";
};

$Categories.onSelect = function() {
  $Profiles.refresh();
};
var $Profiles = {};

$Profiles.profile = null;
$Profiles.subProfiles = {};


$Profiles.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Profiles.add = function(name) {
  var elem = document.createElement("option");
  elem.value = name;
  elem.innerHTML = name;
  this.getElement().appendChild(elem);
};

$Profiles.refresh = function() {
  this.clear();
  var group = this.getProfiles();
  for(var a = 0;a < group.length;a++) {
    var item = group[a];
    this.add(item);
  }
};

$Profiles.getProfiles = function() {
  var baseDir = this.baseDir();
  if(baseDir !== "") {
    var result = fs.readdirSync(baseDir).filter(function(file) {
      return fs.lstatSync(path.resolve(baseDir, file)).isFile() &&
        path.extname(path.resolve(baseDir, file)) === ".json";
    });
    for(var a = 0;a < result.length;a++) {
      result[a] = path.basename(result[a], path.extname(result[a]));
    }
    return result;
  }
  return [];
};

$Profiles.getElement = function() {
  return document.getElementById("profiles_profiles");
};

$Profiles.getSelected = function() {
  var parent = this.getElement();
  return parent.options[parent.selectedIndex];
};

$Profiles.baseDir = function() {
  var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
  var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
  var catDir = $Categories.getSelected();
  if(catDir) {
    catDir = catDir.value;
    return "profiles/" + mouseDir + "/" + lhcDir + "/" + catDir + "/";
  }
  return "";
};

$Profiles.onSelect = function() {
  this.loadProfile();
};

$Profiles.loadProfile = function() {
  var selected = this.getSelected();
  if(selected && this.baseDir() !== "") {
    var profileName = selected.value;
    this.setProfileInfo(profileName);
    var profilePath = this.baseDir() + profileName + ".json";
    if(this.profile) {
      this.profile.kill();
    }
    this.profile = spawn("Profiler_Test.exe", ["../" + profilePath], {shell: false, cwd: "profiler"});
  }
};

$Profiles.setProfileInfo = function(name) {
  var elem = document.getElementById("info_current_profile");
  elem.innerHTML = "Current Profile: " + name;
};

$Profiles.launchCapsF13 = function() {
  console.log("CapsF13");
  var sub = this.subProfiles["capsf13"];
  if(sub) sub.kill();
  sub = spawn("CapsF13.exe", [], {shell: false, cwd: "profiler"});
  this.subProfiles["capsf13"] = sub;
};
var $Audio = {};

$Audio._sounds = {};

$Audio.addSound = function(key, filePath) {
  this._sounds[key] = new Wad({source: filePath});
};

$Audio.play = function(key) {
  var snd = this._sounds[key];
  if(snd) {
    snd.play();
  }
};
