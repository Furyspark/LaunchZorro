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
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(node.selected) {
      var bind = this.getBindById(parseInt(node.value));
      if(bind) arr.push(bind);
    }
  }
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
  elem.value = bind.rapidfire.toString();

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
