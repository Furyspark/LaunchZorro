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

Keymap.prototype.getBind = function(name) {
  if(this._binds[name]) {
    return this._binds[name];
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
    this._binds[bind.origin] = bind;
  }
}
