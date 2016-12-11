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
