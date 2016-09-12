var fs = require("fs");
var path = require("path");
var spawn = require("child_process").spawn;
var exec = require("child_process").execFile;
var interceptionJS = require("./interception/interception");

var $Core = {};

$Core.devices = {};
$Core.devices.lhc = {};
$Core.devices.mice = {};
$Core.devices.list = JSON.parse(fs.readFileSync("devices.json"));
$Core.conf = {};

$Core.DEVICE_TYPE_KEYBOARD = 0;
$Core.DEVICE_TYPE_MOUSE    = 1;

$Core.MOUSE_WHEEL_NONE = 0;
$Core.MOUSE_WHEEL_V    = 1;
$Core.MOUSE_WHEEL_H    = 2;

$Core.MOUSE_MOVE_REL  = 0;
$Core.MOUSE_MOVE_ABS  = 1;


window.onload = function() {
  $Audio.addSound("reload", "assets/audio/profiler_reload.wav");
  $Audio.addSound("unload", "assets/audio/profiler_unload.wav");
  $Audio.addSound("refresh", "assets/audio/profiler_refresh.wav");
  $Audio.addSound("activate_profile", "assets/audio/activate_profile.wav");
  $Audio.addSound("deactivate_profile", "assets/audio/deactivate_profile.wav");
  $Core.start();
  // Load conf.json
  $Core.conf = JSON.parse(fs.readFileSync("conf.json"));
  $Core.onConfLoaded();
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
          $Core.onLHCSelect();
        };
      } else if(groupName === "mice") {
        elem.onchange = function() {
          $Core.onMouseSelect();
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

  $Core.handler = new interceptionJS();
  $Core.handler.start($Core.handleInterception.bind($Core));

  $Categories.refresh();
};

$Core.onConfLoaded = function() {
  var conf = $Core.conf;
  if(conf.defaultDevice && conf.defaultDevice.lhc) {
    // TODO: Add support for remembering device selection
  }
  if(conf.usingWhitelist === true) {
    var elem = document.getElementById("profile-whitelist");
    elem.checked = true;
  }
};

$Core.selectLHC = function(value) {
  var groupElem = document.getElementById("group_lhc");
  for(var a = 0;a < groupElem.children.length;a++) {
    var elem = groupElem.children[a];
    console.log(elem);
  }
}

$Core.onLHCSelect = function() {
  $Profiles.clear();
  $Categories.refresh();
};

$Core.onMouseSelect = function() {
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
    $Profiles.closeProfile();
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

$Core.handleInterception = function(keyCode, keyDown, keyE0, hwid, deviceType, mouseWheel, mouseMove, x, y) {
  var keyName = "";
  if(deviceType === $Core.DEVICE_TYPE_KEYBOARD) keyName = Input.indexToString(keyCode, keyE0);

  // HWID checking
  // if(keyDown && !this.isMouseMove(keyCode, mouseWheel)) console.log(hwid);

  if(this.conf && this.conf.ptt && this.conf.ptt.origin && keyName === this.conf.ptt.origin) {
    this.handler.send(this.conf.ptt.key, keyDown);
  }
  else {
    var prof = $Profiles.profile;
    if(prof) {
      prof.handleInterception(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y);
    }
    else {
      this.handler.send_default();
    }
  }
}

$Core.isMouseMove = function(keyCode, mouseWheel) {
  return (Input.isMouseString(keyCode) || mouseWheel === $Core.MOUSE_WHEEL_H || mouseWheel === $Core.MOUSE_WHEEL_V);
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

$Core.options = function() {
  return {
    enableDefaults: document.getElementById("profile-enable-defaults").checked
  };
}

$Core.onUsingWhitelistChange = function() {
  var elem = document.getElementById("profile-whitelist");
  this.conf.usingWhitelist = false;
  if(elem.checked) {
    this.conf.usingWhitelist = true;
  }
  this.saveConfig();
}

$Core.saveConfig = function() {
  fs.writeFile("conf.json", JSON.stringify(this.conf), function(err) {} );
}
