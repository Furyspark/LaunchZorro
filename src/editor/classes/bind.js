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
  if(this.keymap) return "[" + this.hwid + "] " + this.origin + " -> " + this.keymap.name + (this.label !== "" ? " (" + this.label + ")" : "");
  // if(this.actions.press.length > 0 || this.actions.release.length > 0) return this.origin + " -> " + "Custom" + (this.label !== "" ? " (" + this.label + ")" : "");
  return "[" + this.hwid + "] " + this.origin + " -> " + this.key + (this.label !== "" ? " (" + this.label + ")" : "");
}

Bind.prototype.refresh = function() {
  // Remove old bind with same origin and hwid in same keymap
  for(var a = 0;a < this.parent.binds.length;a++) {
    var bind = this.parent.binds[a];
    if(bind !== this && bind.origin === this.origin && bind.hwid === this.hwid) {
      bind.remove();
      a--;
    }
  }
}

Bind.prototype.isCustom = function() {
  return (this.actions.press.length > 0 || this.actions.release.length > 0);
}
