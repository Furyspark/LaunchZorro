var fs = require("fs");
var path = require("path");
var dialog = require("electron").remote.dialog;
var ipcRenderer = require("electron").ipcRenderer;

window.$ = window.jQuery = require(__dirname + "/../lib/jquery.js");
require(__dirname + "/../lib/jquery-ui.js");

ipcRenderer.on("dialog-closed", function(event, arg) {
  if(arg === "extended") {
    Core.dialogOpen = false;
    Core.waitForInput.awaitingExtended = false;
  }
});

function Core() {}

Core.start = function() {
  this.profile = null;
  this.dialogOpen = false;
  this.profileLocation = "";
  this.buttonLayouts = {};
  this.waitForInput = {
    active: false,
    keycode: "",
    hwid: "",
    keymap: null,
    awaitingExtended: false,
    setActive: function(value) {
      this.active = value;
      if(this.active) {
        this.active = true;
        Core.buttonInfoElem.innerHTML = "Awaiting input...";
      }
      else {
        this.keycode = "";
        this.active = false;
        this.hwid = "";
        this.keymap = null;
        this.awaitingExtended = false;
        Core.buttonInfoElem.innerHTML = "";
      }
    }
  };
  this.buttonInfoElem = document.getElementById("button-info");
  this.coreMessageElem = document.getElementById("core-message");
  this.coreMessageTimeout = null;
  this.extraParamInputs = [];
  this._closing = false;

  this.createNewProfile();
  this.loadButtons();

  this.initJQueryUI();

  window.addEventListener("keyup", this.keyUp.bind(this));
}

Core.maxBindNameLength = function() {
  return 42;
}

Core.setCoreMessage = function(msg, time) {
  if(this.coreMessageTimeout) window.clearTimeout(this.coreMessageTimeout);
  this.coreMessageElem.innerHTML = msg;
  if(time > 0) {
    this.coreMessageTimeout = window.setTimeout(function() {
      this.coreMessageElem.innerHTML = "";
    }.bind(this), time);
  }
}

Core.clearCoreMessage = function() {
  if(this.coreMessageTimeout) window.clearTimeout(this.coreMessageTimeout);
  this.coreMessage.innerHTML = "";
}

Core.initJQueryUI = function() {
  $("#bind-select").sortable({
    update: Core.updateBindSort.bind(Core),
    handle: ".handle"
  }).selectable({
    filter: "div",
    cancel: ".handle",
    stop: Core.updateBindSelect.bind(Core)
  });
}

Core.buttonNew = function() {
  if(!this.dialogOpen) {
    this.createNewProfile();
  }
}

Core.createNewProfile = function() {
  this.profile = new Profile();
  this.profile.addKeymap("Default");
  this.profileLocation = "";
  document.getElementById("profile-name").innerHTML = "New Profile";
  this.removeBindElements();
  this.createBindElements();
  this.profile.deselectBind();
}

Core.buttonLoad = function() {
  if(!this.dialogOpen) {
    this.dialogOpen = true;
    dialog.showOpenDialog({
      title: "Select Profile",
      filter: [
        { name: "Profiles", extensions: ["json"] }
      ],
      properties: ["openFile", "createDirectory"]
    }, function(filenames) {
      if(filenames && filenames.length > 0) Core.loadProfile(filenames[0]);
      else Core.cancelDialog();
    });
  }
}

Core.buttonSave = function() {
  if(!this.dialogOpen) {
    if(this.profileLocation.length > 0) {
      this.saveProfile(this.profileLocation);
    }
    else {
      this.buttonSaveAs();
    }
  }
}

Core.buttonSaveAs = function() {
  if(!this.dialogOpen) {
    this.dialogOpen = true;
    dialog.showSaveDialog({
      title: "Save Profile",
      filters: [
        { name: "Profiles", extensions: ["json"] }
      ]
    }, function(filename) {
      if(filename) Core.saveProfile(filename);
      else Core.cancelDialog();
    });
  }
}

Core.buttonAddKeymap = function() {
  if(!this.dialogOpen) this.profile.addKeymap();
}

Core.buttonRemoveKeymap = function() {
  if(!this.dialogOpen) {
    var arr = this.profile.getSelectedKeymaps();
    while(arr.length > 0) arr.shift().remove();
  }
}

Core.buttonRemoveBind = function() {
  if(!this.dialogOpen) {
    var arr = this.profile.getSelectedBinds();
    while(arr.length > 0) arr.shift().remove();
  }
  this.refresh();
}

Core.loadProfile = function(file) {
  document.getElementById("profile-name").innerHTML = path.basename(file, ".json");
  Core.profileLocation = file;
  fs.readFile(file, function(err, data) {
    Core.dialogOpen = false;
    if(err) throw err;
    Core.profile = Saver.parseProfile(JSON.parse(data.toString()));
    Core.refresh();
    Core.removeBindElements();
    Core.createBindElements();
    Core.profile.deselectBind();
  });
}

Core.saveProfile = function(file) {
  document.getElementById("profile-name").innerHTML = path.basename(file, ".json");
  if(file === "") return;
  if(path.extname(file) !== ".json") file += ".json";
  this.profileLocation = file;

  fs.writeFile(file, Saver.stringifyProfile(this.profile), function() {
    Core.dialogOpen = false;
    ipcRenderer.send("editor", ["saved"]);
    Core.setCoreMessage("Saved!", 1000);
  });
}

Core.cancelDialog = function() {
  this.dialogOpen = false;
  this.refresh();
}

Core.refresh = function() {
  // Add/remove keymaps
  var elem = this.profile.keymapListElem;
  var selects = [];
  var tempScroll = elem.scrollTop;
  while(elem.firstChild) {
    if(elem.firstChild.selected) selects.push(elem.firstChild.value);
    elem.removeChild(elem.firstChild);
  }
  for(var a = 0;a < this.profile.keymaps.length;a++) {
    var keymap = this.profile.keymaps[a];

    var newElem = document.createElement("option");
    newElem.value = keymap.id.toString();
    newElem.innerHTML = keymap.name;
    if(selects.indexOf(newElem.value) !== -1) newElem.selected = true;
    elem.appendChild(newElem);
  }
  elem.scrollTop = tempScroll;

  // Set keymap label editor availability
  var selectedKeymaps = this.profile.getSelectedKeymaps();
  var keymapLabelEditElem = document.getElementById("keymap-label-edit");
  if(selectedKeymaps.length === 1) {
    var keymap = selectedKeymaps[0];
    keymapLabelEditElem.disabled = false;
    keymapLabelEditElem.value = keymap.name;
  }
  else {
    keymapLabelEditElem.disabled = true;
    keymapLabelEditElem.value = "";
  }
}

Core.removeBindElements = function() {
  var rootElem = this.bindListElement();
  while(rootElem.firstChild) {
    rootElem.removeChild(rootElem.firstChild);
  }
  this.profile.deselectBind();
}

Core.createBindElements = function() {
  var selectedKeymaps = this.profile.getSelectedKeymaps();
  if(selectedKeymaps.length !== 1) return;
  var keymap = selectedKeymaps[0];
  for(var a = 0;a < keymap.binds.length;a++) {
    var bind = keymap.binds[a];

    this.createBindElement(bind);
  }
}

Core.recreateBindList = function() {
  var elem = this.profile.bindListElem;
  var selects = [];
  var tempScroll = elem.scrollTop;
  while(elem.firstChild) {
    if(elem.firstChild.selected) selects.push(elem.firstChild.value);
    elem.removeChild(elem.firstChild);
  }

  var selectedKeymaps = this.profile.getSelectedKeymaps();
  var keymap = null;
  var keymapLabelEditElem = document.getElementById("keymap-label-edit");
  if(selectedKeymaps.length === 1) {
    keymap = selectedKeymaps[0];
    keymapLabelEditElem.disabled = false;
    keymapLabelEditElem.value = keymap.name;
  }
  else {
    keymapLabelEditElem.disabled = true;
    keymapLabelEditElem.value = "";
  }

  if(keymap) {
    for(var a = 0;a < keymap.binds.length;a++) {
      var bind = keymap.binds[a];

      var newElem = this.createBindElement(bind);
      if(selects.indexOf(newElem.value) !== -1) newElem.selected = true;
      elem.appendChild(newElem);
    }
  }
}

Core.createBindElement = function(bind) {
  // Root
  var elem = document.createElement("div");
  elem.className = "bind";
  elem.value = bind.id.toString();
  bind.elem = elem;
  // Handle
  var handleElem = document.createElement("img");
  handleElem.src = this.getBindImageSrc(bind);
  elem.appendChild(handleElem);
  handleElem.className = "handle";
  // Name
  var nameElem = document.createElement("span");
  elem.appendChild(nameElem);
  nameElem.className = "bind-name";
  nameElem.innerHTML = bind.nameLimited();
  // Return result
  this.bindListElement().appendChild(elem);
  return elem;
}

Core.getBindImageSrc = function(bind) {
  var result = "../icons/devices/" + bind.hwid + ".png";
  console.log(result);
  return result;
}

Core.bindListElement = function() {
  return document.getElementById("bind-select");
}

Core.updateBindSort = function(ev, ui) {
  var keymaps = this.profile.getSelectedKeymaps();
  if(keymaps.length !== 1) return;
  var km = keymaps[0];
  km.binds.sort(function(a, b) {
    var aPos = a.elem.getBoundingClientRect();
    var bPos = b.elem.getBoundingClientRect();
    if(aPos.top > bPos.top) return 1;
    if(aPos.top < bPos.top) return -1;
    return 0;
  });
}

Core.updateBindSelect = function(ev, ui) {
  this.selectBind();
}

Core.refreshBinds = function() {
  var binds = this.profile.getSelectedBinds();
  var bindLabelEditElem = document.getElementById("bind-label-edit");
  for(var a = 0;a < binds.length;a++) {
    var bind = binds[a];
    for(var b = 0;b < bind.elem.children.length;b++) {
      var elem = bind.elem.children[b];
      var classNames = elem.className.split(" ");
      if(classNames.indexOf("bind-name") !== -1) {
        // Name element found
        elem.innerHTML = bind.nameLimited();
      }
    }
  }
}

Core.selectKeymap = function() {
  if(this.waitForInput.active && this.waitForInput.keymap === this.profile.keymaps[0] && !this.dialogOpen) {
    var keymaps = this.profile.getSelectedKeymaps();
    if(keymaps.length > 0 && keymaps[0] !== this.profile.keymaps[0]) {
      var keymap = keymaps[0];
      var bind = this.profile.keymaps[0].addBind();
      bind.origin = this.waitForInput.keycode.toLowerCase();
      bind.hwid = this.waitForInput.hwid;
      bind.keymap = keymap;
      bind.refresh();
      this.createBindElement(bind);

      for(var a = 0;a < keymaps.length;a++) {
        keymaps[a].deselect();
      }

      this.waitForInput.keymap.select();
      this.waitForInput.setActive(false);
    }
  }
  else {
    this.removeBindElements();
    this.createBindElements();
  }
  this.refresh();
}

Core.selectBind = function() {
  var binds = this.profile.getSelectedBinds();
  this.profile.deselectBind();
  if(binds.length === 1) {
    this.profile.selectBind(binds[0]);
  }
}

Core.cancelBind = function() {
  if(!this.dialogOpen) {
    this.waitForInput.setActive(false);
  }
}

Core.extraAction = function(type) {
  if(this.waitForInput.active) {
    var bind = this.profile.addBind();
    if(bind) {
      bind.origin = this.waitForInput.keycode.toLowerCase();
      bind.key = "ea:" + type;
      bind.hwid = this.waitForInput.hwid;

      bind.refresh();
      this.createBindElement(bind);
      this.waitForInput.setActive(false);
      this.refresh();
    }
  }
}

Core.loadButtons = function() {
  // document.getElementById("core-message").innerHTML = path.join(__dirname, "editor");
  fs.readFile(__dirname + "/static/data/buttons.json", function(err, data) {
    if(err) throw err;
    var btnConf = JSON.parse(data.toString());
    for(var a in btnConf) {
      Core.buttonLayouts[a] = new Button_Layout(btnConf[a], a);
      if(a !== "any") Core.buttonLayouts[a].hide();
    }
    Core.loadDevices();
  });
}

Core.loadDevices = function() {
  fs.readFile(__dirname + "/static/data/devices.json", function(err, data) {
    if(err) throw err;
    var devConf = JSON.parse(data.toString());
    for(var a = 0;a < devConf.mice.length;a++) {
      var dev = devConf.mice[a];
      var elem = document.createElement("option");
      elem.value = dev.dirName;
      elem.innerHTML = dev.name;
      document.getElementById("hw-select-mice").appendChild(elem);
    }
    for(var a = 0;a < devConf.lhc.length;a++) {
      var dev = devConf.lhc[a];
      var elem = document.createElement("option");
      elem.value = dev.dirName;
      elem.innerHTML = dev.name;
      document.getElementById("hw-select-lhc").appendChild(elem);
    }
  });
}

Core.inputKeymapLabel = function() {
  var elem = document.getElementById("keymap-label-edit");
  if(!elem.disabled) {
    var keymap = this.profile.getSelectedKeymaps()[0];
    if(keymap) {
      keymap.name = elem.value;
      Core.refresh();
    }
  }
}

Core.inputBindRefresh = function() {
  var binds = this.profile.getSelectedBinds();
  if(binds.length === 1) {
    var bind = binds[0];

    var elem = document.getElementById("bind-label-edit");
    if(!elem.disabled) bind.label = elem.value;

    var elem = document.getElementById("bind-ctrl");
    if(!elem.disabled) bind.ctrl = elem.checked;

    var elem = document.getElementById("bind-shift");
    if(!elem.disabled) bind.shift = elem.checked;

    var elem = document.getElementById("bind-alt");
    if(!elem.disabled) bind.alt = elem.checked;

    var elem = document.getElementById("bind-rapidfire");
    if(!elem.disabled) bind.rapidfire = parseInt(elem.value);

    var elem = document.getElementById("bind-toggle");
    if(!elem.disabled) bind.toggle = elem.checked;

    var elem = document.getElementById("bind-jra");
    if(!elem.disabled) bind.jra = elem.checked;

    this.refreshBinds();
  }
}

Core.inputButtonLayoutRefresh = function() {
  var nodes = document.getElementById("hw-select-mice").childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    var layout = Core.buttonLayouts[node.value];
    if(layout) {
      if(node.selected) layout.show();
      else layout.hide();
    }
  }

  var nodes = document.getElementById("hw-select-lhc").childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    var layout = Core.buttonLayouts[node.value];
    if(layout) {
      if(node.selected) layout.show();
      else layout.hide();
    }
  }
}

Core.setExtraParamInputs = function(bind, params) {
  this.clearExtraParamInputs();
  for(var a = 0;a < params.length;a++) {
    var obj = params[a];
    var key = "extraparam" + a.toString() + "_" + obj.type;
    this.createExtraParam_Text(bind, a, obj);
  }
}

Core.createExtraParam_Text = function(bind, index, obj) {
  var key = "extraparam" + index.toString() + "_text";
  var elem = document.createElement("input");
  this.extraParamInputs.push(elem);
  elem.type = "text";
  elem.id = key;
  elem.className = "extraparam_text";
  elem.placeholder = obj.name;
  if(obj.value) elem.value = obj.value;
  document.getElementById("group_action").appendChild(elem);
  // Add input handler
  elem.oninput = function() {
    bind.extraParams[index] = elem.value;
  };
}

Core.clearExtraParamInputs = function() {
  while(this.extraParamInputs.length > 0) {
    var obj = this.extraParamInputs.splice(0, 1)[0];
    obj.remove();
  }
}

Core.keyUp = function(e) {
  if(!this.dialogOpen) {
    var key = e.code;
    var ctrl = e.ctrlKey;
    var shift = e.shiftKey;
    var alt = e.altKey;

    if(this.waitForInput.active) {
      var bind = this.profile.addBind();
      if(bind) {
        bind.origin = this.waitForInput.keycode.toLowerCase();
        bind.key = this.getKeyFromCode(key);
        bind.ctrl = ctrl;
        bind.shift = shift;
        bind.alt = alt;
        bind.hwid = this.waitForInput.hwid;

        bind.refresh();
        this.waitForInput.setActive(false);
        this.refresh();
        this.createBindElement(bind);
      }
    }
    else {
      if(e.ctrlKey) {
        if(e.key === "ArrowUp") Core.scrollBind(-1);
        else if(e.key === "ArrowDown") Core.scrollBind(1);
      }
    }
  }
}

Core.scrollBind = function(amount) {
  var binds = this.profile.getSelectedBinds();
  if(binds.length !== 1) return;
  var bind = binds[0];
  var parent = bind.parent;
}

Core.getKeyFromCode = function(key) {
  switch(key.toUpperCase()) {
    case "ARROWLEFT":
      return "left";
      break;
    case "ARROWRIGHT":
      return "right";
      break;
    case "ARROWUP":
      return "up";
      break;
    case "ARROWDOWN":
      return "down";
      break;
    case "PAGEUP":
      return "pgup";
      break;
    case "PAGEDOWN":
      return "pgdn";
      break;
    case "MINUS":
      return "vkbd";
      break;
    case "EQUAL":
      return "vkbb";
      break;
    case "CONTROLLEFT":
      return "lctrl";
      break;
    case "SHIFTLEFT":
      return "lshift";
      break;
    case "ALTLEFT":
      return "lalt";
      break;
    case "BACKQUOTE":
      return "sc029";
      break;
    case "BRACKETLEFT":
      return "vkdb";
      break;
    case "BRACKETRIGHT":
      return "vkdd";
      break;
    case "SEMICOLON":
      return "vkba";
      break;
    case "QUOTE":
      return "vkde";
      break;
    case "COMMA":
      return "vkbc";
      break;
    case "PERIOD":
      return "vkbe";
      break;
    case "SLASH":
      return "vkbf";
      break;
    case "BACKSLASH":
      return "vkdc";
      break;
    case "NUMPADADD":
      return "numpadadd";
      break;
    case "NUMPADSUBTRACT":
      return "numpadsub";
      break;
    case "NUMPADMULTIPLY":
      return "numpadmult";
      break;
    default:
      if(key.match(/^Key([A-Z])$/)) {
        return RegExp.$1.toLowerCase();
      }
      else if(key.match(/^Digit([0-9])$/)) {
        return RegExp.$1;
      }
      else if(key.match(/^Numpad([0-9])$/)) {
        return "numpad" + RegExp.$1;
      }
      else if(key.match(/^F([0-9]{1,2})$/)) {
        return "f" + RegExp.$1;
      }
      return key.toLowerCase();
      break;
  }
}

Core.extendedBind = function() {
  if(this.waitForInput.active && !this.dialogOpen) {
    this.dialogOpen = true;
    this.waitForInput.awaitingExtended = true;
    ipcRenderer.send("open-window-extended", [this.waitForInput.keycode]);
  }
}


//-------------------------------------------------------------------
// Events
//

ipcRenderer.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "CLOSE":
        Core._closing = true;
        ipcRenderer.send("editor", ["close"]);
        break;
    }
  }
});

window.onbeforeunload = function(event) {
  if(!Core._closing) {
    ipcRenderer.send("editor", ["window", "hide"]);
    event.returnValue = false;
  }
}

function Saver() {
  console.log("This is a static class.");
}

Saver.parseProfile = function(obj) {
  var profile = new Profile();
  // Add profile options
  if(obj.options) {
    if(obj.options.enableDefaults) document.getElementById("profile-enable-defaults").checked = obj.options.enableDefaults;
  }
  // Add keymaps
  for(var a = 0;a < obj.keymaps.length;a++) {
    var keymap = obj.keymaps[a];
    profile.addKeymap(keymap.label);
  }
  // Add bindings
  for(var a = 0;a < obj.bindings.length;a++) {
    var keymap = obj.bindings[a];
    for(var b = 0;b < keymap.length;b++) {
      var bind = keymap[b];
      var newBind = profile.keymaps[a].addBind();
      this.parseBind(bind, newBind, profile);
    }
  }

  return profile;
}

Saver.parseBind = function(rawBind, newBind, profile) {
  if(typeof rawBind.alt === "string") newBind.alt = (rawBind.alt === "1" ? true : false);
  if(typeof rawBind.alt === "number") newBind.alt = (rawBind.alt === 1 ? true : false);

  if(typeof rawBind.ctrl === "string") newBind.ctrl = (rawBind.ctrl === "1" ? true : false);
  if(typeof rawBind.ctrl === "number") newBind.ctrl = (rawBind.ctrl === 1 ? true : false);

  if(typeof rawBind.shift === "string") newBind.shift = (rawBind.shift === "1" ? true : false);
  if(typeof rawBind.shift === "number") newBind.shift = (rawBind.shift === 1 ? true : false);

  if(typeof rawBind.rapidfire === "string") newBind.rapidfire = Number(rawBind.rapidfire);
  if(typeof rawBind.rapidfire === "number") newBind.rapidfire = rawBind.rapidfire;

  if(typeof rawBind.toggle === "string") newBind.toggle = Number(rawBind.toggle);
  if(typeof rawBind.toggle === "number") newBind.toggle = rawBind.toggle;

  if(rawBind.jra) newBind.jra = rawBind.jra;

  newBind.hwid = rawBind.hardware_id;
  newBind.label = rawBind.label;
  newBind.origin = rawBind.origin;

  if(rawBind.extra_params) newBind.extraParams = rawBind.extra_params;

  if(typeof rawBind.key === "string") {
    newBind.key = rawBind.key;
    if(rawBind.key.match(/KEYMAP([0-9]+)/i)) {
      var kmId = parseInt(RegExp.$1);
      newBind.key = "";
      newBind.keymap = profile.keymaps[kmId-1];
    }
  }
  else {
    newBind.actions = rawBind.key;
  }

}

Saver.stringifyProfile = function(profile) {
  var result = {
    bindings: [],
    keymaps: [],
    options: {}
  };

  for(var a = 0;a < profile.keymaps.length;a++) {
    var keymap = profile.keymaps[a];
    result.keymaps.push({ label: keymap.name });
    result.bindings.push([]);
    for(var b = 0;b < keymap.binds.length;b++) {
      var bind = keymap.binds[b];
      result.bindings[a].push(this.parseStringifyBind(bind, profile));
    }
  }

  result.options.enableDefaults = document.getElementById("profile-enable-defaults").checked;

  return JSON.stringify(result);
}

Saver.parseStringifyBind = function(bind, profile) {
  var raw = { alt: 0, ctrl: 0, shift: 0, hardware_id: "", rapidfire: 0, toggle: 0, label: "", origin: "", key: "", jra: false };
  if(bind.alt) raw.alt = 1;
  if(bind.ctrl) raw.ctrl = 1;
  if(bind.shift) raw.shift = 1;
  if(bind.toggle) raw.toggle = 1;
  raw.rapidfire = bind.rapidfire;
  raw.hardware_id = bind.hwid;
  raw.label = bind.label;
  raw.origin = bind.origin;
  raw.key = bind.key;
  raw.jra = bind.jra;
  if(bind.extraParams.length && bind.extraParams.length > 0) raw.extra_params = bind.extraParams;

  if(bind.keymap) {
    for(var a = 0;a < profile.keymaps.length;a++) {
      var keymap = profile.keymaps[a];
      if(bind.keymap === keymap) {
        raw.key = "keymap" + (a+1).toString();
      }
    }
  }
  if(bind.isCustom()) {
    raw.key = bind.actions;
  }

  return raw;
}

function Profile() {
  this.initialize.apply(this, arguments);
}

Profile.prototype.constructor = Profile;

Profile.prototype.initialize = function() {
  this.initMembers();
  document.getElementById("profile-enable-defaults").checked = false;
}

Profile.prototype.initMembers = function() {
  this.keymapListElem = document.getElementById("keymap-select");
  this.bindListElem = document.getElementById("bind-select");

  this.keymaps = [];
  this.keymapCount = 0;
  this.bindCount = 0;
}

Profile.prototype.addKeymap = function(name) {
  if(name === undefined) name = this.generateKeymapName();

  var newMap = new Keymap(this, name);
  this.keymaps.push(newMap);

  Core.refresh();

  if(this.keymaps.length === 1) this.keymaps[0].select();

  return newMap;
}

Profile.prototype.removeKeymap = function(keymap) {
  for(var a = 0;a < this.keymaps.length;a++) {
    var km = this.keymaps[a];
    if(km === keymap) {
      var nodes = this.keymapListElem.childNodes;
      for(var b = 0;b < nodes.length;b++) {
        var node = nodes[b];
        if(node.value === keymap.id.toString()) {
          this.keymapListElem.removeChild(node);
          b--;
        }
      }
      this.keymaps.splice(a, 1);
      return true;
    }
  }
  return false;
}

Profile.prototype.generateKeymapName = function() {
  var a = 1;
  var name = "Keymap " + a.toString();
  while(this.keymaps.filter(function(obj) {
    return (obj.name == name);
  }).length > 0) {
    a++;
    name = "Keymap " + a.toString();
  }

  return name;
}

Profile.prototype.getSelectedKeymaps = function() {
  var nodes = this.keymapListElem.childNodes;
  var arr = [];
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(node.selected) {
      var keymap = this.getKeymapById(parseInt(node.value));
      if(keymap) arr.push(keymap);
    }
  }
  return arr;
}

Profile.prototype.getSelectedBinds = function() {
  var nodes = this.bindListElem.childNodes;
  var arr = [];
  $(".bind.ui-selected").each(function(index, elem) {
    var bind = this.getBindById(parseInt(elem.value));
    if(bind) arr.push(bind);
  }.bind(this));
  return arr;
}

Profile.prototype.getKeymapById = function(id) {
  for(var a = 0;a < this.keymaps.length;a++) {
    var keymap = this.keymaps[a];
    if(keymap.id === id) {
      return keymap;
    }
  }
  return null;
}

Profile.prototype.getBindById = function(id) {
  for(var a = 0;a < this.keymaps.length;a++) {
    var keymap = this.keymaps[a];
    for(var b = 0;b < keymap.binds.length;b++) {
      var bind = keymap.binds[b];
      if(bind.id === id) {
        return bind;
      }
    }
  }
  return null;
}

Profile.prototype.selectBind = function(bind) {
  var elem = document.getElementById("bind-label-edit");
  elem.disabled = false;
  elem.value = bind.label;

  var elem = document.getElementById("bind-target");
  elem.disabled = false;
  if(bind.keymap) elem.innerHTML = bind.origin + " -> " + bind.keymap.name;
  else elem.innerHTML = bind.origin + " -> " + bind.key;

  var elem = document.getElementById("bind-toggle");
  elem.disabled = false;
  elem.checked = bind.toggle;

  var elem = document.getElementById("bind-jra");
  elem.disabled = false;
  elem.checked = bind.jra;

  var elem = document.getElementById("bind-rapidfire");
  elem.disabled = false;
  if(bind.rapidfire > 0) elem.value = bind.rapidfire.toString();
  else elem.value = "";

  var elem = document.getElementById("bind-shift");
  elem.disabled = false;
  elem.checked = bind.shift;

  var elem = document.getElementById("bind-ctrl");
  elem.disabled = false;
  elem.checked = bind.ctrl;

  var elem = document.getElementById("bind-alt");
  elem.disabled = false;
  elem.checked = bind.alt;

  this.selectBindExtraAction(bind);
}

Profile.prototype.deselectBind = function() {
  var elem = document.getElementById("bind-label-edit");
  elem.disabled = true;
  elem.value = "";

  var elem = document.getElementById("bind-target");
  elem.disabled = true;
  elem.innerHTML = "";

  var elem = document.getElementById("bind-toggle");
  elem.disabled = true;
  elem.checked = false;

  var elem = document.getElementById("bind-jra");
  elem.disabled = true;
  elem.checked = false;

  var elem = document.getElementById("bind-rapidfire");
  elem.disabled = true;
  elem.value = "";

  var elem = document.getElementById("bind-shift");
  elem.disabled = true;
  elem.checked = false;

  var elem = document.getElementById("bind-ctrl");
  elem.disabled = true;
  elem.checked = false;

  var elem = document.getElementById("bind-alt");
  elem.disabled = true;
  elem.checked = false;

  Core.clearExtraParamInputs();
}

Profile.prototype.selectBindExtraAction = function(bind) {
  if(bind.key.match(/EA:(.+)/i)) {
    var action = RegExp.$1;
    var params = action.split(",");
    action = params[0];
    params.splice(0, 1);
    // Load profile
    if(action.toUpperCase() === "LOADPROFILE") {
      Core.setExtraParamInputs(bind, [{name: "Category", type: "text", value: bind.extraParams[0]}, {name: "Filename", type: "text", value: bind.extraParams[1]}]);
    }
  }
}

Profile.prototype.addBind = function() {
  var keymaps = this.getSelectedKeymaps();
  if(keymaps.length === 1) {
    var keymap = keymaps[0];
    return keymap.addBind();
  }
  return null;
}

function Keymap() {
  this.initialize.apply(this, arguments);
}

Keymap.prototype.constructor = Keymap;

Keymap.prototype.initialize = function(parent, name) {
  this.initMembers();
  this.setup(parent, name);
}

Keymap.prototype.initMembers = function() {
  this.id = 0;
  this.name = "";
  this.binds = [];
  this.parent = null;
}

Keymap.prototype.setup = function(parent, name) {
  this.parent = parent;
  this.name = name;
  this.id = this.parent.keymapCount;
  this.parent.keymapCount++;
}

Keymap.prototype.remove = function() {
  if(this !== this.parent.keymaps[0]) {
    var binds = this.parent.keymaps[0].binds;
    for(var a = 0;a < binds.length;a++) {
      var bind = binds[a];
      if(bind.keymap === this) bind.remove();
    }
  }
  if(this.parent) this.parent.removeKeymap(this);
}

Keymap.prototype.addBind = function() {
  var newBind = new Bind(this);
  this.binds.push(newBind);

  return newBind;
}

Keymap.prototype.removeBind = function(bind) {
  for(var a = 0;a < this.binds.length;a++) {
    var testBind = this.binds[a];
    if(testBind === bind) {
      var nodes = this.parent.bindListElem.childNodes;
      for(var b = 0;b < nodes.length;b++) {
        var node = nodes[b];
        if(node.value === bind.id.toString()) {
          this.parent.bindListElem.removeChild(node);
          b--;
        }
      }
      this.binds.splice(a, 1);
      return true;
    }
  }
  return false;
}

Keymap.prototype.select = function() {
  var nodes = this.parent.keymapListElem.childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(parseInt(node.value) == this.id) {
      node.selected = true;
    }
  }
  Core.refresh();
}

Keymap.prototype.deselect = function() {
  var nodes = this.parent.keymapListElem.childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(parseInt(node.value) == this.id) {
      node.selected = false;
    }
  }
  Core.refresh();
}

Keymap.prototype.getBind = function(origin, hwid) {
  for(var a = 0;a < this.binds.length;a++) {
    var bind = this.binds[a];
  }
}

function Bind() {
  this.initialize.apply(this, arguments);
}

Bind.prototype.constructor = Bind;

Bind.prototype.initialize = function(parent) {
  this.initMembers();
  this.parent = parent;
  this.id = this.parent.parent.bindCount;
  this.parent.parent.bindCount++;
}

Bind.prototype.initMembers = function() {
  this.alt = false;
  this.ctrl = false;
  this.shift = false;
  this.key = "";
  this.origin = "";
  this.rapidfire = 0;
  this.toggle = false;
  this.jra = false;
  this.label = "";
  this.hwid = "";
  this.keymap = null;
  this.actions = { press: [], release: [] };
  this.extraParams = [];

  this.parent = null;
}

Bind.prototype.remove = function() {
  if(this.parent) this.parent.removeBind(this);
}

Bind.prototype.name = function() {
  if(this.keymap) this.origin + " -> " + this.keymap.name + (this.label !== "" ? " (" + this.label + ")" : "");
  return this.origin + " -> " + this.key + (this.label !== "" ? " (" + this.label + ")" : "");
}

Bind.prototype.nameLimited = function() {
  var name = this.name();
  if(name.length > Core.maxBindNameLength()) {
    name = name.slice(0, Core.maxBindNameLength() - 3) + "...";
  }
  return name;
}

Bind.prototype.refresh = function() {
  // Remove old bind with same origin and hwid in same keymap
  for(var a = 0;a < this.parent.binds.length;a++) {
    var bind = this.parent.binds[a];
    if(bind !== this && bind.origin === this.origin && bind.hwid === this.hwid) {
      document.getElementById("bind-select").removeChild(bind.elem);
      bind.remove();
      a--;
    }
  }
}

Bind.prototype.isCustom = function() {
  return (this.actions.press.length > 0 || this.actions.release.length > 0);
}

function Button_Layout() {
  this.initialize.apply(this, arguments);
}

Button_Layout.prototype.constructor = Button_Layout;

Button_Layout.prototype.initialize = function(conf, hwid) {
  this.initMembers();
  this.setup(conf, hwid);
}

Button_Layout.prototype.initMembers = function() {
  this.buttons = [];
}

Button_Layout.prototype.setup = function(conf, hwid) {
  for(var a = 0;a < conf.length;a++) {
    var btn = conf[a];
    this.addButton(btn, hwid);
  }
}

Button_Layout.prototype.show = function() {
  this.buttons.forEach(function(btn) {
    btn.show();
  });
}

Button_Layout.prototype.hide = function() {
  this.buttons.forEach(function(btn) {
    btn.hide();
  });
}

Button_Layout.prototype.addButton = function(src, hwid) {
  var btn = new Button(this, src, hwid);
  this.buttons.push(btn);
  return btn;
}

function Button() {
  this.initialize.apply(this, arguments);
}

Button.prototype.constructor = Button;

Button.prototype.initialize = function(parent, conf, hwid) {
  this.initMembers();
  this.parent = parent;
  this.setup(conf, hwid);
}

Button.prototype.initMembers = function() {
  this.label = "";
  this.keycode = "";
  this.x = 0;
  this.y = 0;
  this.width = 20;
  this.height = 20;
  this.hardware_id = "";
}

Button.prototype.setup = function(conf, hwid) {
  this.label = conf.label;
  this.keycode = conf.keycode;
  this.x = conf.x;
  this.y = conf.y;
  this.width = conf.width;
  this.height = conf.height;
  this.hardware_id = hwid;

  this.elem = document.createElement("button");
  this.elem.style.position = "absolute";
  this.elem.style.left = this.x;
  this.elem.style.top = this.y;
  this.elem.style.width = this.width;
  this.elem.style.height = this.height;
  this.elem.innerHTML = this.label;
  this.elem.addEventListener("mousedown", this.onClick.bind(this));
  document.getElementById("group_buttons").appendChild(this.elem);
}

Button.prototype.show = function() {
  this.elem.style.display = "initial";
}

Button.prototype.hide = function() {
  this.elem.style.display = "none";
}

Button.prototype.onClick = function() {
  if(!Core.dialogOpen) {
    if(Core.waitForInput.active) {
      var keymaps = Core.profile.getSelectedKeymaps();
      if(keymaps.length === 1) {
        var keymap = keymaps[0];
        var bind = keymap.addBind();
        bind.key = this.keycode.toLowerCase();
        bind.origin = Core.waitForInput.keycode.toLowerCase();
        bind.hwid = Core.waitForInput.hwid;
        bind.refresh();
        Core.createBindElement(bind);
      }
      Core.waitForInput.setActive(false);
      Core.refresh();
    }
    else {
      Core.waitForInput.setActive(true);
      Core.waitForInput.keycode = this.keycode;
      Core.waitForInput.hwid = this.hardware_id;
      Core.waitForInput.keymap = Core.profile.getSelectedKeymaps()[0];
    }
  }
}

window.addEventListener("load", function() {
  Core.start();
});
