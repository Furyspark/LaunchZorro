var fs = require("fs");
var path = require("path");
var spawn = require("child_process").spawn;
var exec = require("child_process").execFile;
var interceptionJS;
var processType = "node";
if(process && process.versions && process.versions.electron) {
  interceptionJS = require("./interception/interception");
  processType = "electron";
}
else {
  interceptionJS = require("./interception-node/interception");
}

var $Core = {};

$Core.color = {};
$Core.color.profile_selected = "#FFC57F";
$Core.color.profile_unselected = "white";
$Core.color.category_selected = $Core.color.profile_selected;
$Core.color.category_unselected = $Core.color.profile_unselected;

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


$Core.fileExists = function(path, callback) {
  fs.access(path, fs.constants.R_OK, function(err) {
    var result = true;
    if(err) result = false;
    callback(result);
  });
}

$Core.isDirectory = function(path, callback) {
  fs.lstat(path, function(err, stats) {
    var result = false;
    if(stats.isDirectory()) result = true;
    callback(result);
  });
}

$Core.generateConfig = function() {
  var result = {
    suspend_key: "f1",
    ptt: {
      origin: "capslock",
      key: "scrolllock"
    },
    usingWhitelist: true,
    defaultDevice: {
      lhc: "normal",
      mouse: "normal"
    }
  };

  return result;
}

$Core.start = function() {
  // Add Left-Handed Controllers to the list of devices
  if(processType !== "node") {
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
  }

  $Core.handler = new interceptionJS();
  $Core.handler.start($Core.handleInterception.bind($Core));
  // $Core.initQuickField();

  if(processType !== "node") {
    $Categories.refresh();
  }

  $Core.setPriority();
};

$Core.onConfLoaded = function() {
  if(processType !== "node") {
    var conf = $Core.conf;
    var doRefresh = false;
    if(conf.defaultDevice && conf.defaultDevice.lhc) {
      $Core.selectLHC(conf.defaultDevice.lhc);
      doRefresh = true;
    }
    if(conf.defaultDevice && conf.defaultDevice.mouse) {
      $Core.selectMouse(conf.defaultDevice.mouse);
      doRefresh = true;
    }
    if(conf.usingWhitelist === true) {
      var elem = document.getElementById("profile-whitelist");
      elem.checked = true;
    }

    if(doRefresh) {
      $Profiles.clear();
      $Categories.refresh();
    }
  }
  else {

  }
};

$Core.setPriority = function() {
  if(processType !== "node") var app = spawn("wmic", ["process", "where", "name=\"LaunchZorro.exe\"", "CALL", "setpriority", "\"high priority\""], { shell: true });
}

$Core.selectLHC = function(value) {
  $Core.devices.lhc[value].element.firstChild.checked = true;
}

$Core.selectMouse = function(value) {
  $Core.devices.mice[value].element.firstChild.checked = true;
}

$Core.onLHCSelect = function() {
  $Profiles.clear();
  $Categories.refresh();
  $Core.conf.defaultDevice = $Core.conf.defaultDevice || {};
  $Core.conf.defaultDevice.lhc = $Core.LHCElement().value;
  $Core.saveConfig();
};

$Core.onMouseSelect = function() {
  $Profiles.clear();
  $Categories.refresh();
  $Core.conf.defaultDevice = $Core.conf.defaultDevice || {};
  $Core.conf.defaultDevice.mouse = $Core.MouseElement().value;
  $Core.saveConfig();
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
  else if(deviceType === $Core.DEVICE_TYPE_MOUSE) keyName = Input.mouseIndexToString(keyCode);

  // HWID checking
  if(keyDown && !this.isMouseMove(keyCode, mouseWheel)) console.log(hwid);

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
  if(processType !== "node") {
    return {
      enableDefaults: document.getElementById("profile-enable-defaults").checked
    };
  }
  return {
    enableDefaults: false
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

$Core.initQuickField = function() {
  var groupElem = document.createElement("div");
  groupElem.className = "group";
  groupElem.id = "group_quickfield";
  document.body.appendChild(groupElem);
  for(var a = 0;a < 10;a++) {
    var elem = document.createElement("div");
    elem.className = "quickfield_item";
    elem.id = "quickfield_item" + a.toString();
    groupElem.appendChild(elem);
  }
}

$Core.destroyInterception = function() {
  this.handler.destroy();
}
