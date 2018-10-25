function Core() {}

Core.baseData = null;

Core.start = function() {
  // Initialize submodules
  KeyCodeTranslator.initialize();

  // Start
  this.lowerPrivileges()
  .catch((err) => { console.error(err); })
  .then(() => {
    require(this.dirs.appRoot + "/lib/jquery-ui.js");
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
      params: [],
      setActive: function(value, msg, params) {
        this.active = value;
        if(this.active) {
          this.active = true;
          if(msg) Core.buttonInfoElem.innerHTML = msg;
          else Core.buttonInfoElem.innerHTML = "Awaiting input...";
          if(params) this.params = params;
        }
        else {
          this.keycode = "";
          this.active = false;
          this.hwid = "";
          this.keymap = null;
          this.awaitingExtended = false;
          this.params = [];
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
  });
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
  console.log(this.dirs.appData + "/profiles");
  if(!this.dialogOpen) {
    this.dialogOpen = true;
    dialog.showOpenDialog({
      title: "Select Profile",
      filter: [
        { name: "Profiles", extensions: ["json"] }
      ],
      properties: ["openFile", "createDirectory"],
      defaultPath: this.dirs.appData + "/profiles"
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
      ],
      defaultPath: this.dirs.appData + "/profiles"
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
  return Core.dirs.appData + "/icons/devices/" + bind.hwid + ".png";
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
  fs.readFile(__dirname + "/data/buttons.json", function(err, data) {
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
  fs.readFile(__dirname + "/data/devices.json", function(err, data) {
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
    if(obj.type === "text") {
      this.createExtraParam_Text(bind, a, obj, key);
    } else if(obj.type === "button") {
      this.createExtraParam_Button(bind, a, obj, key);
    }
  }
}

Core.createExtraParam_Text = function(bind, index, obj, key) {
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

Core.createExtraParam_Button = function(bind, index, obj, key) {
  var elem = document.createElement("button");
  this.extraParamInputs.push(elem);
  elem.id = key;
  elem.type = "button";
  elem.className = "extraparam_button";
  elem.innerHTML = obj.name;
  document.getElementById("group_action").appendChild(elem);
  // Add click handler
  elem.onclick = obj.callback;
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

Core.extendedBindEdit = function(bind) {
  if(!this.waitForInput.active && !this.dialogOpen) {
    let rawBind = {
      extended: bind.extended
    };
    this.dialogOpen = true;
    this.waitForInput.setActive(true, "Awaiting Extended Bind...", [bind]);
    ipcRenderer.send("editor", ["extended", rawBind]);
  }
}

Core.lowerPrivileges = function() {
  return new Promise((resolve, reject) => {
    if(os.platform() === "win32") {
      resolve();
      return;
    }
    else {
      fs.readFile(this.dirs.electronRoot + "/user.json", (err, data) => {
        if(err) {
          reject(err);
        }
        else {
          let user = JSON.parse(data.toString());
          try {
            process.setgid(user.group);
            process.setuid(user.name);
            console.log("Successfully dropped privileges");
            resolve();
          }
          catch(err) {
            console.error("Couldn't drop privileges! Be very careful!");
            reject();
          }
        }
      });
    }
  });
};


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
      case "BASEDATA":
        Core.baseData = args[0];
        Core.dirs = Core.baseData.dirs;
        Core.start();
        break;
    }
  }
});

ipcRenderer.on("extended", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "SET":
        if(args.length > 0) {
          var bind = Core.waitForInput.params[0];
          bind.extended = args[0];
          Core.dialogOpen = false;
          Core.waitForInput.setActive(false);
        }
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
