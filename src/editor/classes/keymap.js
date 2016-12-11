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

  Core.refresh();

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
    console.log(bind);
  }
}
