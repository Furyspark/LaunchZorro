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
