function Signal() {
  this.initialize.apply(this, arguments);
}

Signal.prototype.constructor = Signal;

Signal.prototype.initialize = function() {
  this.initMembers();
}

Signal.prototype.initMembers = function() {
  this.listeners = [];
}

Signal.prototype.dispatch = function() {
  var arr = [];
  for(var a = 0;a < this.listeners.length;a++) {
    var listener = this.listeners[a];
    arr.push(listener);
    if(listener.once) {
      this.listeners.splice(a, 1);
      a--;
    }
  }

  for(var a = 0;a < arr.length;a++) {
    var listener = arr[a];
    if(listener.listener) listener.callback.apply(listener.listener, listener.arguments);
  }
}

Signal.prototype.remove = function(object, callback) {
  for(var a = 0;a < this.listeners.length;a++) {
    var listener = this.listeners[a];
    if(listener.listener === object && listener.callback === callback) {
      this.listeners.splice(a, 1);
      a--;
    }
  }
}

Signal.prototype.add = function(object, callback, arguments) {
  if(!arguments || !arguments instanceof Array) arguments = [];
  this.listeners.push({ listener: object, callback: callback, arguments: arguments, once: false });
}

Signal.prototype.addOnce = function(object, callback, arguments) {
  if(!arguments || !arguments instanceof Array) arguments = [];
  this.listeners.push({ listener: object, callback: callback, arguments: arguments, once: true });
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
    case 29: return "lctrl"; break;
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
    case 53: if(e0) return "vkbf"; return "numpaddiv"; break;
    case 55: if(e0) return ""; return "numpadmult"; break;
    case 56: return "lalt"; break;
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
    case 78: if(e0) return ""; return "numpadplus"; break;
    case 79: if(e0) return "end"; return "numpad1"; break;
    case 80: if(e0) return "down"; return "numpad2"; break;
    case 81: if(e0) return "pgdn"; return "numpad3"; break;
    case 82: if(e0) return "insert"; return "numpad0"; break;
    case 83: if(e0) return "delete"; return ""; break;
    case 87: return "f11"; break;
    case 88: return "f12"; break;
    case 91: if(e0) return "lwin"; return ""; break;
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
  var prof = $Profiles.profile;
  if(prof) {
    var elem = document.getElementById("profile-whitelist");
    prof._usingWhitelist = false;
    if(elem.checked) {
      prof._usingWhitelist = true;
    }
  }
}
function Keymap() {
  this.initialize.apply(this, arguments);
}

Keymap.prototype.constructor = Keymap;

Keymap.prototype.initialize = function(profile) {
  this.initMembers();
  this._profile = profile;
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
  this.toggleActive = false;
  this.held = false;
  this.hwid = "any";
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
  if(!this.held || this._rapidfire === 0) {
    this.held = true;

    if(!this._toggle || (this._toggle && !this.toggleActive)) {
      if(this._toggle) this.toggleActive = true;
      this.sequence.down.onEnd.addOnce(this, this.sequenceDownEndFunction);
      this.fireSequence(this.sequence.down);
    }
    else if(this._toggle && this.toggleActive) {
      if(this._toggle) this.toggleActive = false;
      this.sequence.up.onEnd.addOnce(this, this.sequenceUpEndFunction);
      this.fireSequence(this.sequence.up);
    }
  }
}

Bind.prototype.release = function() {
  this.held = false;

  if(!this._toggle) {
    this.sequence.up.onEnd.addOnce(this, this.sequenceUpEndFunction);
    this.fireSequence(this.sequence.up);
  }
}

Bind.prototype.sequenceDownEndFunction = function() {
  // Rapidfire
  if(this._rapidfire > 0 && this.held) {
    this._rapidfireId = window.setTimeout(function() {
      this.sequence.up.onEnd.addOnce(this, this.sequenceUpEndFunction);
      this.fireSequence(this.sequence.up);
    }.bind(this), this._rapidfire);
  }
}

Bind.prototype.sequenceUpEndFunction = function() {
  // Rapidfire
  if(this._rapidfire > 0 && this.held) {
    this._rapidfireId = window.setTimeout(function() {
      this.sequence.down.onEnd.addOnce(this, this.sequenceDownEndFunction);
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

  if(src.key.match(/KEYMAP([0-9]+)/i)) {
    var i = parseInt(RegExp.$1);
    this.sequence.down.addAction(new Action("keymap", i-1));
    this.sequence.up.addAction(new Action("keymap", 0));
  }
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
}

Action.prototype.initMembers = function() {
  this.type = "";
  this.keyName = "";
  this.keyDown = true;
  this.value = 0;
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
  }
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
  var selected = this.getSelected();
  if(selected) selected = selected.value;
  this.clear();
  var cats = this.getCategoryDirectories();
  for(var a = 0;a < cats.length;a++) {
    var cat = cats[a];
    this.add(cat);
  }
  if(selected) this.select(selected);
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

$Categories.select = function(value) {
  var nodes = this.getElement().childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(node.value === value) {
      node.selected = true;
    }
  }
}
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
  var selected = this.getSelected();
  if(selected) selected = selected.value;
  this.clear();
  var group = this.getProfiles();
  for(var a = 0;a < group.length;a++) {
    var item = group[a];
    this.add(item);
  }
  if(selected) this.select(selected);
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

$Profiles.select = function(value) {
  var nodes = this.getElement().childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(node.value === value) {
      node.selected = true;
    }
  }
}

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

    this.closeProfile();

    this.profile = new Profile(profilePath);

    // if(this.profile) {
    //   this.profile.kill();
    // }
    // this.profile = spawn("Profiler_Test.exe", ["../" + profilePath], {shell: false, cwd: "profiler"});
  }
};

$Profiles.closeProfile = function() {
  if(this.profile) {
    this.profile.remove();
    this.profile = null;
  }
}

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
function Profile() {
  this.initialize.apply(this, arguments);
}

Profile.prototype.constructor = Profile;

Profile.prototype.initialize = function(url) {
  this.initMembers();
  this.loadProfile(url);
}

Profile.prototype.initMembers = function() {
  // this._core = null;
  this._source = null;
  this._suspended = false;
  this.keymaps = [];
  this._keymapIndex = 0;
  this._held = {};
  this._whitelist = null;
  this._whitelistLoading = false;
  this._usingWhitelist = false;
  this._mouseFuncHeld = [];
}

Profile.prototype.core = function() {
  return $Core.handler;
}

Profile.prototype.loadProfile = function(url) {
  fs.readFile(url, function(err, data) {
    this._source = JSON.parse(data);
    this.applySource();
  }.bind(this));

  this._whitelistLoading = true;
  fs.readFile("profiler/whitelist.json", function(err, data) {
    if(!err) {
      this._whitelist = JSON.parse(data);
      this._whitelistLoading = false;
      // Get whitelist element value
      var elem = document.getElementById("profile-whitelist");
      if(elem.checked) this._usingWhitelist = true;
    }
    else {
      console.log("No whitelist has been loaded.");
    }
  }.bind(this));
}

Profile.prototype.applySource = function() {
  var src = this.source();
  for(var a = 0;a < src.keymaps.length;a++) {
    var km = new Keymap(this);
    km.applySource(src.keymaps[a], src.bindings[a]);
    this.keymaps.push(km);
  }
}

Profile.prototype.source = function() {
  return this._source;
}

Profile.prototype.options = function() {
  return this.source().options;
}

Profile.prototype.handleInterception = function(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y) {
  var options = this.options();
  var coreOptions = $Core.options();

  if(keyName == $Core.conf.suspend_key) {
    if(keyDown) this.toggleSuspend();
  }
  else {
    if(this.suspended() || deviceType === $Core.DEVICE_TYPE_MOUSE) {
      this.core().send_default();
    }
    else {
      var deviceType = this.checkWhitelist(hwid);
      var onWhitelist = this.usingWhitelist() ? this.isOnWhitelist(deviceType) : true;
      var bind = this.getBind(deviceType, keyName);
      if(onWhitelist && bind) {
        // Key DOWN
        if(keyDown) {
          this.pressBind(bind);
        }
        // Key UP
        else {
          this.releaseBind(bind);
        }
      }
      else if((options && (options.enableDefaults || coreOptions.enableDefaults) && !bind) || !onWhitelist) {
        this.core().send_default();
      }
    }
  }
}

Profile.prototype.checkWhitelist = function(hwid) {
  if(this._whitelistLoading) return "any";
  for(var a in this._whitelist) {
    var obj = this._whitelist[a];
    if(obj.indexOf(hwid) !== -1) return a;
  }
  return "any";
}

Profile.prototype.isOnWhitelist = function(deviceType) {
  console.log(this._whitelist[deviceType]);
  return (this._whitelist[deviceType] !== undefined);
}

Profile.prototype.usingWhitelist = function() {
  return (this._whitelist !== null && this._usingWhitelist);
}

Profile.prototype.remove = function() {
  // this.core().destroy();
}

Profile.prototype.getBind = function(deviceType, keyName) {
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
  if(this._keymapIndex !== value) this._keymapIndex = value;
}

Profile.prototype.suspended = function() {
  return this._suspended;
}

Profile.prototype.suspend = function(sw) {
  this._suspended = sw;
  if(sw) {
    $Audio.play("deactivate_profile");
  }
  else {
    $Audio.play("activate_profile");
  }
}
