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
