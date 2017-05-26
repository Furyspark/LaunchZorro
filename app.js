var fs = require("fs");
var path = require("path");
var spawn = require("child_process").spawn;
var exec = require("child_process").execFile;
var interceptionJS = require("./interception/interception");
var processType = "electron";
var electron = require("electron");
var ipcRenderer = electron.ipcRenderer;
var SocketIOServer = require("socket.io");

var cmdArgs = {
  lhc: "",
  mouse: "",
  category: "",
  profile: ""
};

process.argv.forEach(function(value, index) {
  if(index > 1) {
    if(value.match(/lhc=([\w- ]+)/i)) {
      cmdArgs.lhc = RegExp.$1;
    }
    else if(value.match(/mouse=([\w- ]+)/i)) {
      cmdArgs.mouse = RegExp.$1;
    }
    else if(value.match(/category=([\w- ]+)/i)) {
      cmdArgs.category = RegExp.$1;
    }
    else if(value.match(/profile=([\w- ]+)/i)) {
      cmdArgs.profile = RegExp.$1;
    }
  }
});

function Signal() {
  this.initialize.apply(this, arguments);
}


Signal.sortFunction = function(a, b) {
  if(a.priority < b.priority) return -1;
  if(a.priority > b.priority) return 1;
  return 0;
}


Signal.prototype.initialize = function() {
  this._bindings = [];
}

Signal.prototype.add = function(callback, context, args, priority) {
  if(args === undefined) args = [];
  if(priority === undefined) priority = 50;
  this._bindings.push({
    callback: callback,
    context: context,
    args: args,
    once: false,
    priority: priority
  });
}

Signal.prototype.addOnce = function(callback, context, args, priority) {
  if(!args) args = [];
  if(!priority && priority !== 0) priority = 50;
  this._bindings.push({
    callback: callback,
    context: context,
    args: args,
    once: true,
    priority: priority
  });
}

Signal.prototype.remove = function(callback, context) {
  for(var a = 0;a < this._bindings.length;a++) {
    var obj = this._bindings[a];
    if(obj.callback === callback && obj.context === context) {
      this._bindings.splice(a, 1);
      return true;
    }
  }
  return false;
}

Signal.prototype.dispatch = function(params) {
  var binds = [];
  for(var a = 0;a < this._bindings.length;a++) {
    var bind = this._bindings[a];
    if(bind.once) {
      this._bindings.splice(a, 1);
      a--;
    }
    binds.push(bind);
  }
  binds = binds.sort(Signal.sortFunction);
  for(var a = 0;a < binds.length;a++) {
    var bind = binds[a];
    if(params) bind.callback.apply(bind.context, params);
    else bind.callback.apply(bind.context, bind.args);
  }
}

function Input() {
  console.log("This is a static class.");
}

Input.indexToString = function(index, e0) {
  switch(index) {
    case 1: return "escape"; break;
    case 2: return "1"; break;
    case 3: return "2"; break;
    case 4: return "3"; break;
    case 5: return "4"; break;
    case 6: return "5"; break;
    case 7: return "6"; break;
    case 8: return "7"; break;
    case 9: return "8"; break;
    case 10: return "9"; break;
    case 11: return "0"; break;
    case 12: return "vkbd"; break;
    case 13: return "vkbb"; break;
    case 14: return "backspace"; break;
    case 15: return "tab"; break;
    case 16: return "q"; break;
    case 17: return "w"; break;
    case 18: return "e"; break;
    case 19: return "r"; break;
    case 20: return "t"; break;
    case 21: return "y"; break;
    case 22: return "u"; break;
    case 23: return "i"; break;
    case 24: return "o"; break;
    case 25: return "p"; break;
    case 26: return "vkdb"; break;
    case 27: return "vkdd"; break;
    case 28: if(e0) return "numpadenter"; return "enter"; break;
    case 29: if(e0) return "rctrl"; return "lctrl"; break;
    case 30: return "a"; break;
    case 31: return "s"; break;
    case 32: return "d"; break;
    case 33: return "f"; break;
    case 34: return "g"; break;
    case 35: return "h"; break;
    case 36: return "j"; break;
    case 37: return "k"; break;
    case 38: return "l"; break;
    case 39: return "vkba"; break;
    case 40: return "vkde"; break;
    case 41: return "sc029"; break;
    case 42: return "lshift"; break;
    case 43: return "vkdc"; break;
    case 44: return "z"; break;
    case 45: return "x"; break;
    case 46: return "c"; break;
    case 47: return "v"; break;
    case 48: return "b"; break;
    case 49: return "n"; break;
    case 50: return "m"; break;
    case 51: return "vkbc"; break;
    case 52: return "vkbe"; break;
    case 53: if(e0) return "numpaddiv"; return "vkbf"; break;
    case 54: return "rshift"; break;
    case 55: if(e0) return ""; return "numpadmult"; break;
    case 56: if(e0) return "ralt"; return "lalt"; break;
    case 57: return "space"; break;
    case 58: return "capslock"; break;
    case 59: return "f1"; break;
    case 60: return "f2"; break;
    case 61: return "f3"; break;
    case 62: return "f4"; break;
    case 63: return "f5"; break;
    case 64: return "f6"; break;
    case 65: return "f7"; break;
    case 66: return "f8"; break;
    case 67: return "f9"; break;
    case 68: return "f10"; break;
    case 69: return "pause"; break;
    case 70: return "scrolllock"; break;
    case 71: if(e0) return "home"; return "numpad7"; break;
    case 72: if(e0) return "up"; return "numpad8"; break;
    case 73: if(e0) return "pgup"; return "numpad9"; break;
    case 74: if(e0) return ""; return "numpadsub"; break;
    case 75: if(e0) return "left"; return "numpad4"; break;
    case 76: if(e0) return ""; return "numpad5"; break;
    case 77: if(e0) return "right"; return "numpad6"; break;
    case 78: if(e0) return ""; return "numpadadd"; break;
    case 79: if(e0) return "end"; return "numpad1"; break;
    case 80: if(e0) return "down"; return "numpad2"; break;
    case 81: if(e0) return "pgdn"; return "numpad3"; break;
    case 82: if(e0) return "insert"; return "numpad0"; break;
    case 83: if(e0) return "delete"; return ""; break;
    case 87: return "f11"; break;
    case 88: return "f12"; break;
    case 91: if(e0) return "lwin"; return ""; break;
    case 92: if(e0) return "rwin"; return ""; break;
  }
}

Input.mouseIndexToString = function(index) {
  switch(index) {
    case 1:
    case 2:
      return "mousebuttonleft";
      break;
    case 4:
    case 8:
      return "mousebuttonright";
      break;
    case 16:
    case 32:
      return "mousebuttonmiddle";
      break;
    case 64:
    case 128:
      return "mousebutton4";
      break;
    case 256:
    case 512:
      return "mousebutton5";
      break;
  }
}

Input.isMouseString = function(string) {
  if(string === "mousebuttonleft" || string === "mousebuttonmiddle" || string === "mousebuttonright" ||
    string === "mousebutton4" || string === "mousebutton5" || string === "mousewheelup" || string === "mousewheeldown") return true;
  return false;
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

$Core._superGlobalProfile = null;
$Core._globalProfile = null;

$Core._recentProfiles = [];
$Core._coreMsgTimeout = null;
$Core._waitForWhitelistKey = false;

$Core.onConfigLoaded = new Signal();
$Core._configLoaded = false;

$Core.baseData = null;



$Core.start = function() {
  this._closing = false;
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
  $Core.loadWhitelist();

  $Categories.refresh();
  $Core.loadConfig();

  // $Core.setPriority();
};

$Core.loadConfig = function() {
  $Core.createBaseDirectories();
  $Core.loadRecentProfiles();
  this.conf = this.generateConfig();
  this.fileExists(this.baseData.baseDir + "/conf.json", function(result) {
    fs.readFile($Core.baseData.baseDir + "/conf.json", function(err, data) {
      $Core.conf = JSON.parse(data.toString());
      $Core.onConfLoaded();
    });
  });
}

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

$Core.createBaseDirectories = function() {
  // Create profiles directory
  fs.mkdir(this.baseData.baseDir + "/profiles", function(err) {
    if(err) {
      console.log(err);
    }
  });
}

$Core.generateConfig = function() {
  var result = {
    suspend_key: "f1",
    usingWhitelist: true,
    defaultDevice: {
      lhc: "normal",
      mouse: "normal"
    },
    startMinimized: false,
    blockCLISwitching: false
  };

  return result;
}

$Core.setCoreMessage = function(msg, time) {
  if(this._coreMsgTimeout) window.clearTimeout(this._coreMsgTimeout);
  var elem = document.getElementById("core-message");
  elem.innerHTML = msg;
  if(time > 0) {
    this._coreMsgTimeout = window.setTimeout(function() {
      elem.innerHTML = "";
    }, time);
  }
}

$Core.clearCoreMessage = function() {
  if(this._coreMsgTimeout) window.clearTimeout(this._coreMsgTimeout);
  document.getElementById("core-message").innerHTML = "";
}

$Core.addRecentProfile = function(lhc, mouse, category, profile) {
  var test = this._recentProfiles.filter(function(obj) {
    if(obj.lhc !== lhc) return false;
    if(obj.mouse !== mouse) return false;
    if(obj.category !== category) return false;
    if(obj.profile !== profile) return false;
    return true;
  });
  if(test.length > 0) {
    var testObj = test[0];
    var index = this._recentProfiles.indexOf(testObj);
    this._recentProfiles.splice(index, 1);
    this._recentProfiles.unshift(testObj);
  } else {
    this._recentProfiles.unshift({
      lhc: lhc,
      mouse: mouse,
      category: category,
      profile: profile
    });
  }
  this.saveRecentProfiles();
  if(this._recentProfiles.length > 10) this._recentProfiles = this._recentProfiles.slice(0, 10);
  $Core.sendRecentProfilesToMain();
}

$Core.sendRecentProfilesToMain = function() {
  ipcRenderer.send("core", ["recentprofiles", this._recentProfiles]);
}

$Core.loadGlobalProfiles = function() {
  // Load super global profile
  var superGlobalProfilePath = this.baseData.baseDir + "/profiles/global.json";
  this.fileExists(superGlobalProfilePath, function(result) {
    this._superGlobalProfile = null;
    if(result) this._superGlobalProfile = new Profile(superGlobalProfilePath);
  }.bind(this));
  // Load global profile
  var mouseDir = this.devices.mice[this.MouseElement().value].dirName;
  var lhcDir = this.devices.lhc[this.LHCElement().value].dirName;
  var globalProfilePath = this.baseData.baseDir + "/profiles/" + mouseDir + "/" + lhcDir + "/global.json";
  this.fileExists(globalProfilePath, function(result) {
    this._globalProfile = null;
    if(result) this._globalProfile = new Profile(globalProfilePath);
  }.bind(this));
}

$Core.loadRecentProfiles = function() {
  fs.readFile(this.baseData.baseDir + "/recent.json", function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    this._recentProfiles = JSON.parse(data);
    $Core.sendRecentProfilesToMain();
  }.bind(this));
}

$Core.saveRecentProfiles = function() {
  fs.writeFile(this.baseData.baseDir + "/recent.json", JSON.stringify(this._recentProfiles));
}

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
    if(conf.linkOverwolf) {
      var elem = document.getElementById("checkbox-overwolf-server");
      elem.checked = true;
      Overwolf.startServer();
    }
    if(conf.blockCLISwitching) {
      var elem = document.getElementById("checkbox-block-cli-switching");
      elem.checked = true;
    }

    if(doRefresh) {
      $Profiles.clear();
      $Categories.refresh();
    }
  }
  else {

  }
  $Core.loadGlobalProfiles();

  $Core._configLoaded = true;
  $Core.checkConfig();
};

$Core.checkConfig = function() {
  if(!this._configLoaded) return;
  if(!this.baseData) return;
  this.onConfigLoaded.dispatch();
}

$Core.setPriority = function() {
  var processName = process.argv[0].split(/[\\\/]/).slice(-1)[0];
  var app = spawn("wmic", ["process", "where", "name=\"" + processName + "\"", "CALL", "setpriority", "\"high priority\""], { shell: true });
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
  $Core.loadGlobalProfiles();
  $Core.saveConfig();
};

$Core.onMouseSelect = function() {
  $Profiles.clear();
  $Categories.refresh();
  $Core.conf.defaultDevice = $Core.conf.defaultDevice || {};
  $Core.conf.defaultDevice.mouse = $Core.MouseElement().value;
  $Core.loadGlobalProfiles();
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
  Overwolf.sendMessage("No profile loaded");
};

$Core.reloadProfile = function(noSound) {
  if(!noSound && noSound !== false) noSound = false;
  this.loadGlobalProfiles();
  $Profiles.loadProfile();
  if(!noSound) $Audio.play("reload");
};

$Core.refreshProfiles = function(noSound) {
  if(!noSound && noSound !== false) noSound = false;
  $Categories.refresh();
  $Profiles.refresh();
  if(!noSound) $Audio.play("refresh");
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
  // if(keyDown && !this.isMouseMove(keyCode, mouseWheel)) console.log(hwid);
  // if(keyDown && !this.isMouseMove(keyCode, mouseWheel)) console.log(keyName);

  var sendDefault = true;
  var prof = $Profiles.profile;
  var overridden = false;
  if(this._waitForWhitelistKey && keyCode > 0) {
    sendDefault = false;
    this._waitForWhitelistKey = false;
    this.addToWhitelist(null, hwid);
    this.onSelectWhitelistDevice();
    this.saveWhitelist();
    this.clearCoreMessage();
  }
  else if(!!prof && keyName === this.conf.suspend_key) {
    sendDefault = false;
    if(keyDown) {
      prof.toggleSuspend();
    }
  }
  if(!overridden && !!this._superGlobalProfile && this._superGlobalProfile.shouldHandle(keyName, hwid, deviceType, { ignoreWhitelist: true })) {
    sendDefault = false;
    overridden = this._superGlobalProfile.isOverriding(keyName, hwid);
    this._superGlobalProfile.handleInterception(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y);
  }
  if(!overridden && !!this._globalProfile && this._globalProfile.shouldHandle(keyName, hwid, deviceType, {})) {
    sendDefault = false;
    overridden = this._globalProfile.isOverriding(keyName, hwid);
    this._globalProfile.handleInterception(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y);
  }
  if(!overridden && !!prof && prof.shouldHandle(keyName, hwid, deviceType, {})) {
    sendDefault = false;
    overridden = prof.isOverriding(keyName, hwid);
    prof.handleInterception(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y);
  }
  if(sendDefault) {
    this.handler.send_default();
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
  fs.writeFile(this.baseData.baseDir + "/conf.json", JSON.stringify(this.conf, null, 2), function(err) {} );
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

$Core.openEditor = function() {
  ipcRenderer.send("core", ["editor", "open"]);
}

$Core.buttonWhitelist = function() {
  this.setCoreMessage("Press a key or button on your desired device...");
  this._waitForWhitelistKey = true;
}

$Core.loadWhitelist = function() {
  this._whitelist = null;
  fs.readFile("profiler/whitelist.json", function(err, data) {
    if(err) console.log(err);
    this._whitelist = JSON.parse(data);
    for(var a in this._whitelist) {
      this.addWhitelistDeviceToGroup(a);
    }
    $Core.onSelectWhitelistDevice();
  }.bind(this));
}

$Core.saveWhitelist = function() {
  fs.writeFile("profiler/whitelist.json", JSON.stringify(this._whitelist));
}

$Core.addToWhitelist = function(device, hwid) {
  if(!device) device = this.getWhitelistDeviceElem().value;
  if(!this._whitelist) return;
  if(!this._whitelist[device]) this._whitelist[device] = [];
  var index = this._whitelist[device].indexOf(hwid);
  if(index === -1) this._whitelist[device].push(hwid);
  this.saveWhitelist();
}

$Core.addWhitelistDeviceToGroup = function(name) {
  var groupElem = document.getElementById("group-whitelist");
  var elem = document.createElement("option");
  elem.value = name;
  elem.innerHTML = name;
  groupElem.appendChild(elem);
}

$Core.getWhitelistDeviceElem = function() {
  var group = document.getElementById("group-whitelist");
  for(var a = 0;a < group.children.length;a++) {
    var child = group.children[a];
    if(child.selected) return child;
  }
}

$Core.onSelectWhitelistDevice = function() {
  var elem = this.getWhitelistDeviceElem();
  if(elem) this.setWhitelistHwidList(elem.value);
}

$Core.setWhitelistHwidList = function(device) {
  var group = document.getElementById("group-whitelist-hwids");
  var hwidList = this._whitelist[device];
  while(group.firstChild) {
    group.removeChild(group.firstChild);
  }
  for(var a = 0;a < hwidList.length;a++) {
    var hwid = hwidList[a];
    var elem = document.createElement("option");
    elem.value = hwid;
    elem.innerHTML = hwid;
    group.appendChild(elem);
  }
}

$Core.onBlockCLIChange = function() {
  var elem = document.getElementById("checkbox-block-cli-switching");
  this.conf.blockCLISwitching = elem.checked;
  this.saveConfig();
}


//-------------------------------------------------------------------
// Events
//

ipcRenderer.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "CLOSE":
        $Core._closing = true;
        ipcRenderer.send("core", ["close"]);
        break;
      case "PROFILE":
        if(args.length > 0 && args[0].toUpperCase() === "RELOAD") $Core.reloadProfile(true);
        else if(args.length > 5 && args[0].toUpperCase() === "LOAD") {
          var f = function() {
            var lhc = args[1];
            if(lhc === "") {
              lhc = $Core.LHCElement().value;
            }
            var mouse = args[2];
            if(mouse === "") mouse = $Core.MouseElement().value;
            var category = args[3];
            var profile = args[4];
            var type = args[5];
            if(type.toUpperCase() === "CLI" && $Core.conf.blockCLISwitching) return;
            $Core.selectLHC(lhc);
            $Core.onLHCSelect();
            $Core.selectMouse(mouse);
            $Core.onMouseSelect();
            $Categories.select(category);
            $Profiles.select(profile);
            $Profiles.loadProfile(mouse + "/" + lhc + "/" + category + "/" + profile);
          };
          if($Core._configLoaded) f();
          else $Core.onConfigLoaded.addOnce(f, this);
        }
        break;
      case "BASEDATA":
        $Core.baseData = args[0];
        $Core.start();
        break;
    }
  }
});


window.onbeforeunload = function(event) {
  if(!$Core._closing) {
    ipcRenderer.send("core", ["window", "hide"]);
    event.returnValue = false;
  }
}

function Keymap() {
  this.initialize.apply(this, arguments);
}

Keymap.prototype.constructor = Keymap;

Keymap.prototype.initialize = function(profile, keymapIndex) {
  this.initMembers();
  this._profile = profile;
  this._keymapIndex = keymapIndex;
}

Keymap.prototype.initMembers = function() {
  this._profile = null;
  this._label = "";
  this._binds = {};
}

Keymap.prototype.profile = function() {
  return this._profile;
}

Keymap.prototype.getBind = function(deviceType, name) {
  if(this._binds[deviceType] && this._binds[deviceType][name]) {
    return this._binds[deviceType][name];
  }
  return null;
}

Keymap.prototype.core = function() {
  return this.profile().core();
}

Keymap.prototype.applySource = function(keymapSrc, bindsSrc) {
  this._label = keymapSrc.label;
  for(var a = 0;a < bindsSrc.length;a++) {
    var src = bindsSrc[a];
    var bind = new Bind(this);
    bind.applySource(src);
    this._binds[bind.hwid] = this._binds[bind.hwid] || {};
    this._binds[bind.hwid][bind.origin] = bind;
  }
}

function Bind() {
  this.initialize.apply(this, arguments);
}

Bind.prototype.constructor = Bind;

Bind.prototype.initialize = function(keymap) {
  this.initMembers();
  this._keymap = keymap;
}

Bind.prototype.initMembers = function() {
  this._keymap = null;
  this.origin = "";
  this.sequence = { down: new Sequence(this), up: new Sequence(this) };
  this._rapidfire = 0;
  this._rapidfireId = 0;
  this._toggle = false;
  this._isExtended = false;
  this.toggleActive = false;
  this.held = false;
  this.hwid = "any";
  this.elem = null;
}

Bind.prototype.keymap = function() {
  return this._keymap;
}

Bind.prototype.profile = function() {
  return this.keymap().profile();
}

Bind.prototype.core = function() {
  return this.profile().core();
}

Bind.prototype.fireSequence = function(sequence) {
  if(sequence === this.sequence.up && this.sequence.down.running()) this.sequence.down.cancel();
  else if(sequence === this.sequence.down && this.sequence.up.running()) this.sequence.up.cancel();
  sequence.start();
}

Bind.prototype.press = function() {
  if(!this.held) {
    this.held = true;

    if(!this._toggle || (this._toggle && !this.toggleActive)) {
      if(this._toggle) this.toggleActive = true;
      this.sequence.down.onEnd.addOnce(this.sequenceDownEndFunction, this);
      this.fireSequence(this.sequence.down);
    }
    else if(this._toggle && this.toggleActive) {
      if(this._toggle) this.toggleActive = false;
      this.sequence.up.onEnd.addOnce(this.sequenceUpEndFunction, this);
      this.fireSequence(this.sequence.up);
    }
  }
}

Bind.prototype.release = function() {
  this.held = false;

  if(!this._toggle) {
    this.sequence.up.onEnd.addOnce(this.sequenceUpEndFunction, this);
    this.fireSequence(this.sequence.up);
  }
}

Bind.prototype.sequenceDownEndFunction = function() {
  // Rapidfire
  if(this._rapidfire > 0 && this.held) {
    this._rapidfireId = window.setTimeout(function() {
      this.sequence.up.onEnd.addOnce(this.sequenceUpEndFunction, this);
      this.fireSequence(this.sequence.up);
    }.bind(this), this._rapidfire);
  }
}

Bind.prototype.sequenceUpEndFunction = function() {
  // Rapidfire
  if(this._rapidfire > 0 && this.held) {
    this._rapidfireId = window.setTimeout(function() {
      this.sequence.down.onEnd.addOnce(this.sequenceDownEndFunction, this);
      this.fireSequence(this.sequence.down);
    }.bind(this), this._rapidfire);
  }

  if(this._rapidfireId && !this.held) {
    window.clearInterval(this._rapidfireId);
    this._rapidfireId = null;
  }
}

Bind.prototype.applySource = function(src) {
  var jra = false;
  if(src.jra) jra = true;

  var doAlt = false;
  var doShift = false;
  var doCtrl = false;
  if(src.alt) {
    if((typeof src.alt === "string" && src.alt === "1") ||
    (typeof src.alt === "number" && src.alt === 1) ||
    (typeof src.alt === "boolean" && src.alt === true)) {
      this.sequence.down.addAction(new Action("key", "lalt", true));
      doAlt = true;
    }
  }
  if(src.ctrl) {
    if((typeof src.ctrl === "string" && src.ctrl === "1") ||
    (typeof src.ctrl === "number" && src.ctrl === 1) ||
    (typeof src.ctrl === "boolean" && src.ctrl === true)) {
      this.sequence.down.addAction(new Action("key", "lctrl", true));
      doCtrl = true;
    }
  }
  if(src.shift) {
    if((typeof src.shift === "string" && src.shift === "1") ||
    (typeof src.shift === "number" && src.shift === 1) ||
    (typeof src.shift === "boolean" && src.shift === true)) {
      this.sequence.down.addAction(new Action("key", "lshift", true));
      doShift = true;
    }
  }

  if(src.hardware_id) {
    this.hwid = src.hardware_id;
  }

  // Keymap
  if(src.key.match(/KEYMAP([0-9]+)/i)) {
    var i = parseInt(RegExp.$1);
    this.sequence.down.addAction(new Action("keymap", i-1));
    this.sequence.up.addAction(new Action("keymap", 0));
  }
  // Extra Action
  else if(src.key.match(/EA:(.+)/i)) {
    var action = RegExp.$1;
    this.parseExtraAction(action, src);
  }
  // Normal Key
  else {
    this.sequence.down.addAction(new Action("key", src.key, true));
    if(jra) {
      this.sequence.down.addAction(new Action("delay", 30));
      this.sequence.down.addAction(new Action("key", src.key, false));
      if(doAlt) this.sequence.down.addAction(new Action("key", "lalt", false));
      if(doCtrl) this.sequence.down.addAction(new Action("key", "lctrl", false));
      if(doShift) this.sequence.down.addAction(new Action("key", "lshift", false));
      this.sequence.down.addAction(new Action("delay", 30));
      if(doAlt) this.sequence.down.addAction(new Action("key", "lalt", true));
      if(doCtrl) this.sequence.down.addAction(new Action("key", "lctrl", true));
      if(doShift) this.sequence.down.addAction(new Action("key", "lshift", true));
      this.sequence.down.addAction(new Action("key", src.key, true));
    }
    this.sequence.up.addAction(new Action("key", src.key, false));
  }

  this.origin = src.origin;
  var kmI = this.keymap()._keymapIndex;
  if(!this.profile().hasBindInKeymap(this.origin, kmI)) {
    if(this.profile()._bindDb[kmI]) this.profile()._bindDb[kmI].push(this.origin);
    else this.profile()._bindDb[kmI] = [this.origin];
  }

  if(doAlt) this.sequence.up.addAction(new Action("key", "lalt", false));
  if(doCtrl) this.sequence.up.addAction(new Action("key", "lctrl", false));
  if(doShift) this.sequence.up.addAction(new Action("key", "lshift", false));

  if(src.rapidfire) {
    if(typeof src.rapidfire === "string") this._rapidfire = parseInt(src.rapidfire);
    else if(typeof src.rapidfire === "number") this._rapidfire = src.rapidfire;
  }

  if(src.toggle) {
    if((typeof src.toggle === "string" && src.toggle === "1") ||
    (typeof src.toggle === "number" && src.toggle === 1) ||
    (typeof src.toggle === "boolean" && src.toggle === true)) this._toggle = true;
  }
}

Bind.prototype.parseExtraAction = function(action, src) {
  if(action.toUpperCase() === "LOADPROFILE") {
    this.sequence.up.addAction(new Action("loadprofile", src.extra_params[0], src.extra_params[1]));
  } else if(action.toUpperCase() === "EXTENDED") {
    this._isExtended = true;
    this.parseExtendedAction(src);
  }
}

Bind.prototype.parseExtendedAction = function(src) {
  var list = [
    {srcList: src.extended.press, sequence: this.sequence.down},
    {srcList: src.extended.release, sequence: this.sequence.up}
  ];
  for(var a = 0;a < list.length;a++) {
    var obj = list[a];
    for(var b = 0;b < obj.srcList.length;b++) {
      var srcAction = obj.srcList[b];
      if(srcAction.type === "key") obj.sequence.addAction(new Action("key", srcAction.key, srcAction.params[0]));
      else if(srcAction.type === "delay") obj.sequence.addAction(new Action("delay", srcAction.params[0]));
    }
  }
}

function Sequence() {
  this.initialize.apply(this, arguments);
}

Sequence.prototype.constructor = Sequence;

Sequence.prototype.initialize = function(bind) {
  this.initMembers();
  this._bind = bind;
}

Sequence.prototype.initMembers = function() {
  this._bind = null;
  this._actions = [];
  this._index = 0;
  this._timer = null;
  this._keysDown = [];

  this.onStart = new Signal();
  this.onEnd = new Signal();
}

Sequence.prototype.bind = function() {
  return this._bind;
}

Sequence.prototype.keymap = function() {
  return this.bind().keymap();
}

Sequence.prototype.profile = function() {
  return this.keymap().profile();
}

Sequence.prototype.core = function() {
  return this.profile().core();
}

Sequence.prototype.addAction = function(action) {
  this._actions.push(action);
}

Sequence.prototype.running = function() {
  return this._index > 0;
}

Sequence.prototype.cancel = function() {
  if(this._timer) {
    window.clearTimeout(this._timer);
  }
  while(this._keysDown.length > 0) {
    var keyName = this._keysDown.shift();
    this.core().send(keyName, false);
  }
  this.end();
}

Sequence.prototype.start = function() {
  if(this.running()) this.cancel();
  this._index = 0;
  this.onStart.dispatch();
  this.continue();
}

Sequence.prototype.continue = function() {
  var action = this._actions[this._index];
  this._index++;
  var instantContinue = true;
  if(action) {
    var details = action.get();
    switch(details.type) {
      case "key":
        // Mouse wheel
        if(details.name === "mousewheelup") {
          if(details.down) this.core().send("mousewheel", true, 0, 100);
        }
        else if(details.name === "mousewheeldown") {
          if(details.down) this.core().send("mousewheel", true, 0, -100);
        }
        // Keys
        else {
          if(Input.isMouseString(details.name)) {
            // Mouse function already held
            if(this.profile()._mouseFuncHeld.indexOf(details.name) !== -1) {
              if(!details.down) {
                this.profile()._mouseFuncHeld.splice(this.profile()._mouseFuncHeld.indexOf(details.name), 1);
                this.core().send(details.name, details.down);
              }
            }
            // Mouse function not yet held
            else {
              if(details.down) {
                this.profile()._mouseFuncHeld.push(details.name);
                this.core().send(details.name, details.down);
              }
            }
          }
          else {
            this.core().send(details.name, details.down);
          }
          if(details.down && this._keysDown.indexOf(details.name) === -1) {
            this._keysDown.push(details.name);
          }
          else if(!details.down) {
            this._keysDown = this._keysDown.filter(function(n) { return (n !== details.down); } );
          }
        }
        break;
      case "keymap":
        this.profile().switchKeymap(details.value);
        break;
      case "delay":
        instantContinue = false;
        this._timer = window.setTimeout(this.continue.bind(this), details.value);
        break;
      case "loadprofile":
        var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
        var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
        var catDir = details.category;
        var profileName = details.filename;
        var url = mouseDir + "/" + lhcDir + "/" + catDir + "/" + profileName;
        $Profiles.loadProfile(url);
        break;
    }
  }

  if(instantContinue && action) this.continue();
  else if(!action) this.end();
}

Sequence.prototype.end = function() {
  this._index = 0;
  this.onEnd.dispatch();
}

function Action() {
  this.initialize.apply(this, arguments);
}

Action.prototype.constructor = Action;

Action.prototype.initialize = function(type) {
  this.initMembers();
  this.type = type;
  if(type === "key") {
    this.keyName = arguments[1];
    this.keyDown = arguments[2];
  }
  else if(type === "delay") {
    this.value = arguments[1];
  }
  else if(type === "keymap") {
    this.value = arguments[1];
  }
  else if(type === "loadprofile") {
    this.extraParams[0] = arguments[1];
    this.extraParams[1] = arguments[2];
  }
}

Action.prototype.initMembers = function() {
  this.type = "";
  this.keyName = "";
  this.keyDown = true;
  this.value = 0;
  this.extraParams = [];
}

Action.prototype.get = function() {
  switch(this.type) {
    case "key":
      return { type: "key", name: this.keyName, down: this.keyDown };
      break;
    case "keymap":
      return { type: "keymap", value: this.value };
      break;
    case "delay":
      return { type: "delay", value: this.value };
      break;
    case "loadprofile":
      return { type: "loadprofile", category: this.extraParams[0], filename: this.extraParams[1] };
      break;
  }
}

var $Categories = {};

$Categories.path            = {};
$Categories.path.icon       = {};
$Categories.path.icon.blank = "icons/categories/blank.png";

$Categories.current          = {};
$Categories.current.lhc      = "";
$Categories.current.mouse    = "";
$Categories.current.category = "";

$Categories.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Categories.add = function(name) {
  var elem = document.createElement("div");
  elem.id = "category_" + name.slice().replace(/[ ]/g, "_");
  elem.value = name;
  elem.className = "group_option";
  elem.style.background = $Core.color.category_unselected;
  elem.onclick = function(e) {
    $Categories.selectElem(this);
    $Categories.onSelect();
  }.bind(elem);
  this.getElement().appendChild(elem);
  // Add label
  var txtElem = document.createElement("span");
  txtElem.innerHTML = name;
  elem.appendChild(txtElem);
  // Add icon
  var iconPath = "icons/categories/" + name.toLowerCase() + ".png";
  fs.access(iconPath, fs.constants.F_OK, function(err) {
    var iconElem = document.createElement("img");
    if(!err) iconElem.src = process.cwd() + "/" + iconPath;
    else iconElem.src = process.cwd() + "/" + $Profiles.path.icon.blank;
    iconElem.width = "32";
    iconElem.height = "32";
    elem.insertBefore(iconElem, txtElem);
  });
  return elem;
};

$Categories.refresh = function() {
  this.clear();
  var cats = this.getCategoryDirectories();
  for(var a = 0;a < cats.length;a++) {
    var cat = cats[a];
    var elem = this.add(cat);
    if($Core.LHCElement().value === this.current.lhc && $Core.MouseElement().value === this.current.mouse &&
        cat === this.current.category) {
      this.selectElem(elem);
    }
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
  for(var a = 0;a < parent.children.length;a++) {
    var elem = parent.children[a];
    if(elem.selected) return elem;
  }
  return null;
};

$Categories.selectElem = function(elem) {
  var parent = this.getElement();
  for(var a = 0;a < parent.children.length;a++) {
    var child = parent.children[a];
    child.selected = false;
    child.style.background = $Core.color.category_unselected;
    if(child === elem) {
      child.selected = true;
      child.style.background = $Core.color.category_selected;
    }
  }
}

$Categories.baseDir = function() {
  var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
  var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
  return $Core.baseData.baseDir + "/profiles/" + mouseDir + "/" + lhcDir + "/";
};

$Categories.onSelect = function() {
  $Profiles.refresh();
  this.current.lhc = $Core.LHCElement().value;
  this.current.mouse = $Core.MouseElement().value;
  this.current.category = this.getSelected().value;
};

$Categories.select = function(value) {
  var nodes = this.getElement().childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(node.value === value) {
      this.selectElem(node);
    }
  }
}

var $Profiles = {};

$Profiles.profile = null;
$Profiles.subProfiles = {};

$Profiles.path            = {};
$Profiles.path.icon       = {};
$Profiles.path.icon.blank = "icons/profiles/generic/blank.png";

$Profiles.current          = {};
$Profiles.current.lhc      = "";
$Profiles.current.mouse    = "";
$Profiles.current.category = "";
$Profiles.current.profile  = "";


$Profiles.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Profiles.add = function(name) {
  var elem = document.createElement("div");
  elem.id = name.slice().replace(/[ ]/g, "_");
  elem.value = name;
  elem.className = "group_option";
  elem.style.background = $Core.color.profile_unselected;
  elem.onclick = function(e) {
    $Profiles.selectElem(this);
    $Profiles.onSelect();
  }.bind(elem);
  this.getElement().appendChild(elem);
  // Add label
  var txtElem = document.createElement("span");
  txtElem.innerHTML = name;
  txtElem.style.width = "164px";
  elem.appendChild(txtElem);
  // Add icon
  var dirName = "generic";
  var catElem = $Categories.getSelected();
  if(catElem) {
    var catDir = catElem.id;
    if(catDir.match(/category_([\w-]+)/)) {
      dirName = RegExp.$1.toLowerCase();
    }
  }
  var iconPath = "icons/profiles/" + dirName.toLowerCase() + "/" + name.toLowerCase() + ".png";
  fs.access(iconPath, fs.constants.F_OK, function(err) {
    var iconElem = document.createElement("img");
    if(!err) iconElem.src = process.cwd() + "/" + iconPath;
    else iconElem.src = process.cwd() + "/" + $Profiles.path.icon.blank;
    iconElem.width = "32";
    iconElem.height = "32";
    elem.insertBefore(iconElem, txtElem);
  });
  return elem;
};

$Profiles.refresh = function() {
  this.clear();
  var group = this.getProfiles();
  for(var a = 0;a < group.length;a++) {
    var item = group[a];
    var elem = this.add(item);
    if($Core.LHCElement().value === this.current.lhc && $Core.MouseElement().value === this.current.mouse &&
        $Categories.getSelected().value === this.current.category && item === this.current.profile) {
      this.selectElem(elem);
    }
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
  for(var a = 0;a < parent.children.length;a++) {
    var elem = parent.children[a];
    if(elem.selected) return elem;
  }
  return null;
};

$Profiles.selectElem = function(elem) {
  var parent = this.getElement();
  for(var a = 0;a < parent.children.length;a++) {
    var child = parent.children[a];
    child.selected = false;
    child.style.background = $Core.color.profile_unselected;
    if(child === elem) {
      child.selected = true;
      child.style.background = $Core.color.profile_selected;
    }
  }
}

$Profiles.select = function(value) {
  var nodes = this.getElement().childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(node.value === value) {
      this.selectElem(node);
    }
  }
}

$Profiles.baseDir = function() {
  var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
  var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
  var catElem = $Categories.getSelected();
  if(catElem) {
    var catDir = catElem.value;
    return $Core.baseData.baseDir + "/profiles/" + mouseDir + "/" + lhcDir + "/" + catDir + "/";
  }
  return "";
};

$Profiles.onSelect = function() {
  this.loadProfile();
};

$Profiles.loadProfile = function(url) {
  var lhc = "";
  var mouse = "";
  var category = "";
  var profileName = "";
  if(!url) {
    var selected = this.getSelected();
    if(selected && this.baseDir() !== "") {
      profileName = selected.value;
      var profilePath = this.baseDir() + profileName + ".json";
      this.profile = new Profile(profilePath);
      // Set current data
      lhc = $Core.LHCElement().value;
      mouse = $Core.MouseElement().value;
      category = $Categories.getSelected().value;
    }
  }
  else {
    var dirs = url.split(/[\/\\]/);
    mouse = dirs[0];
    lhc = dirs[1];
    category = dirs[2];
    profileName = dirs[3];
    var profilePath = $Core.baseData.baseDir + "/profiles/" + url + ".json";
    this.profile = new Profile(profilePath);
  }
  if(!this.profile) return;
  this.setProfileInfo(profileName);
  // Error callback
  this.profile.onError.addOnce(function() {
    this.profile = null;
    this.setProfileInfo();
  }, this);
  // Load callback
  this.profile.onLoad.addOnce(function() {
    // Set current data
    this.current.mouse = mouse;
    this.current.lhc = lhc;
    this.current.category = category;
    this.current.profile = profileName;
    this.refresh();
    // Add to recent profiles
    $Core.addRecentProfile(lhc, mouse, category, profileName);
  }, this);
}

$Profiles.closeProfile = function() {
  if(this.profile) {
    this.profile.remove();
    this.profile = null;
    this.selectElem(null);
  }
}

$Profiles.setProfileInfo = function(name) {
  if(!name) name = "N/A";
  var elem = document.getElementById("info_current_profile");
  elem.innerHTML = "Current Profile: " + name;
  Overwolf.sendMessage(name, true);
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

function Profile() {
  this.initialize.apply(this, arguments);
}

Profile.prototype.constructor = Profile;

Profile.prototype.initialize = function(url) {
  this.initMembers();
  this.loadProfile(url);
}

Profile.prototype.initMembers = function() {
  this._source = null;
  this._suspended = false;
  this.keymaps = [];
  this._keymapIndex = 0;
  this._held = {};
  this._whitelist = null;
  this._whitelistLoading = false;
  this._mouseFuncHeld = [];
  this._bindDb = {};
  this.onError = new Signal();
  this.onLoad = new Signal();
  this.loaded = false;
}

Profile.prototype.core = function() {
  return $Core.handler;
}

Profile.prototype.loadProfile = function(url) {
  fs.readFile(url, function(err, data) {
    if(err) {
      this.onError.dispatch();
      return;
    }
    this._source = JSON.parse(data);
    this.applySource();
    this.loaded = true;
    this.onLoad.dispatch();
  }.bind(this));

  this._whitelistLoading = true;
  fs.readFile("profiler/whitelist.json", function(err, data) {
    if(!err) {
      this._whitelist = JSON.parse(data);
      this._whitelistLoading = false;
    }
    else {
      console.log("No whitelist has been loaded.");
    }
  }.bind(this));
}

Profile.prototype.applySource = function() {
  var src = this.source();
  for(var a = 0;a < src.keymaps.length;a++) {
    var km = new Keymap(this, a);
    km.applySource(src.keymaps[a], src.bindings[a]);
    this.keymaps.push(km);
  }
}

Profile.prototype.source = function() {
  return this._source;
}

Profile.prototype.options = function() {
  if(this.source()) return this.source().options;
  return null;
}

Profile.prototype.handleInterception = function(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y) {
  var deviceNames = this.checkWhitelist(hwid);
  var bind = this.getBind(deviceNames, keyName);
  // if(onWhitelist && bind) {
  if(bind) {
    // Key DOWN
    if(keyDown) {
      this.pressBind(bind);
      return true;
    }
    // Key UP
    else {
      this.releaseBind(bind);
      return true;
    }
  }
  return false;
}

Profile.prototype.shouldHandle = function(keyName, hwid, deviceType, config) {
  if(this.suspended()) return false;
  var deviceNames = this.checkWhitelist(hwid);
  if(this.usingWhitelist() && !config.ignoreWhitelist) {
    if(!this.isOnWhitelist(deviceNames)) return false;
  }
  var bind = this.getBind(deviceNames, keyName);
  if(!bind) {
    if(this.enableDefaults()) return false;
    if(deviceType === $Core.DEVICE_TYPE_MOUSE) return false;
  }
  return true;
}

Profile.prototype.isOverriding = function(keyName, hwid) {
  var deviceNames = this.checkWhitelist(hwid);
  var bind = this.getBind(deviceNames, keyName);
  return !!bind;
}

Profile.prototype.enableDefaults = function() {
  if(this === $Core._globalProfile || this === $Core._superGlobalProfile) return true;
  var options = this.options();
  if(options.enableDefaults) return true;
  var coreOptions = $Core.options();
  if(coreOptions.enableDefaults) return true;
  return false;
}

Profile.prototype.checkWhitelist = function(hwid) {
  var result = ["any"];
  if(this._whitelistLoading) return [];
  for(var a in this._whitelist) {
    var obj = this._whitelist[a];
    if(obj.indexOf(hwid) !== -1) result.push(a);
  }
  return result;
}

Profile.prototype.isOnWhitelist = function(deviceTypeArr) {
  for(var a = 0;a < deviceTypeArr.length;a++) {
    var deviceType = deviceTypeArr[a];
    if(this._whitelist[deviceType] !== undefined) return true;
  }
  return false;
}

Profile.prototype.usingWhitelist = function() {
  return (this._whitelist !== null && $Core.conf.usingWhitelist === true);
}

Profile.prototype.remove = function() {
  // this.core().destroy();
}

Profile.prototype.hasBind = function(origin) {
  for(var a in this._bindDb) {
    var km = this._bindDb[a];
    if(km.indexOf(origin) !== -1) return true;
  }
  return false;
}

Profile.prototype.hasBindInKeymap = function(origin, keymapIndex) {
  var km = this._bindDb[keymapIndex];
  if(!km) return false;
  if(km.indexOf(origin) !== -1) return true;
  return false;
}

Profile.prototype.hasActiveBind = function(origin) {
  if(this.hasBindInKeymap(origin, 0)) return true;
  if(this._keymapIndex > 0 && this.hasBindInKeymap(origin, this._keymapIndex)) return true;
  if(this._held[origin]) return true;
  return false;
}

Profile.prototype.getBind = function(deviceTypes, keyName) {
  for(var a = 0;a < deviceTypes.length;a++) {
    var deviceType = deviceTypes[a];
    // Search held bind
    var held = this._held[keyName];
    var km;
    var bind;
    if(held) {
      km = this.keymaps[held.keymap];
      bind = km.getBind(deviceType, keyName);
      if(bind) {
        return bind;
      }
    }
    // Search current keymap
    km = this.keymaps[this.keymapIndex()];
    bind = km.getBind(deviceType, keyName);
    if(bind) {
      return bind;
    }
    // Search base keymap
    km = this.keymaps[0];
    bind = km.getBind(deviceType, keyName);
    if(bind) {
      return bind;
    }
  }
  return null;
}

Profile.prototype.pressBind = function(bind) {
  if(!this._held[bind.origin]) this._held[bind.origin] = { keymap: this.keymapIndex() };
  bind.press();
}

Profile.prototype.releaseBind = function(bind) {
  bind.release();
  this._held[bind.origin] = null;
}

Profile.prototype.toggleSuspend = function() {
  if(this._suspended) {
    this.suspend(false);
  }
  else {
    this.suspend(true);
  }
}

Profile.prototype.keymapIndex = function() {
  return this._keymapIndex;
}

Profile.prototype.switchKeymap = function(value) {
  if(this._keymapIndex !== value) {
    this.releaseKeymapHeld();
    this._keymapIndex = value;
    this.pressKeymapHeld();
  }
}

Profile.prototype.pressKeymapHeld = function() {
  var keymap = this.keymaps[this.keymapIndex()];
  var bind = keymap.getBind("any", "keymapheld");
  if(bind) {
    bind.press();
  }
}

Profile.prototype.releaseKeymapHeld = function() {
  var keymap = this.keymaps[this.keymapIndex()];
  var bind = keymap.getBind("any", "keymapheld");
  if(bind) {
    bind.release();
  }
}

Profile.prototype.suspended = function() {
  return this._suspended;
}

Profile.prototype.suspend = function(sw) {
  this._suspended = sw;
  Overwolf.sendMessage(null, !sw);
  if(!Overwolf.isActive()) {
    if(sw) {
      $Audio.play("deactivate_profile");
    }
    else {
      $Audio.play("activate_profile");
    }
  }
}

function Overwolf() {}

Overwolf.server = null;
Overwolf.port = 11994;
Overwolf.socket = null;

Overwolf.onChange = function() {
  var elem = document.getElementById("checkbox-overwolf-server");
  if(elem.checked) {
    $Core.conf.linkOverwolf = true;
    this.startServer();
  } else {
    $Core.conf.linkOverwolf = false;
    this.stopServer();
  }
  $Core.saveConfig();
}

Overwolf.startServer = function() {
  if(!!this.server) return;
  this.server = new SocketIOServer(this.port);
  this.server.on("connection", this.onConnection);
}

Overwolf.stopServer = function() {
  if(!this.server) return;
  this.server.close();
  this.server = null;
  this.socket = null;
}

Overwolf.onConnection = function(socket) {
  Overwolf.socket = socket;
  socket.on("disconnect", Overwolf.onDisconnect);
}

Overwolf.onDisconnect = function() {
  Overwolf.socket = null;
}

Overwolf.isActive = function() {
  return !!this.server;
}

Overwolf.sendMessage = function(msg, active) {
  if(!this.isActive()) return;
  var data = { msg: msg, active: active };
  this.server.sockets.emit("profileMsg", data);
}

process.on("exit", function() {
  $Core.destroyInterception();
});


if(processType !== "node") {
  window.onload = function() {
    $Audio.addSound("reload", "assets/audio/profiler_reload.wav");
    $Audio.addSound("unload", "assets/audio/profiler_unload.wav");
    $Audio.addSound("refresh", "assets/audio/profiler_refresh.wav");
    $Audio.addSound("activate_profile", "assets/audio/activate_profile.wav");
    $Audio.addSound("deactivate_profile", "assets/audio/deactivate_profile.wav");
    // $Core.start();
  };
}
else {
  // $Core.start();
  // $Core.fileExists("conf.json", function(result) {
  //   if(result) {
  //     var conf = JSON.parse(fs.readFileSync("conf.json"));
  //     Object.assign($Core.conf, conf);
  //   }
  //   $Core.onConfLoaded();
  // });
  // // Auto load profile
  // if(!cmdArgs.lhc) {
  //   cmdArgs.lhc = $Core.conf.defaultDevice.lhc;
  // }
  // if(!cmdArgs.mouse) {
  //   cmdArgs.mouse = $Core.conf.defaultDevice.mouse;
  // }
  // $Profiles.loadProfile(cmdArgs.mouse + "/" + cmdArgs.lhc + "/" + cmdArgs.category + "/" + cmdArgs.profile);
}
