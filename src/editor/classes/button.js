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
