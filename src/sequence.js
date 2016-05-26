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
        this.core().send(details.name, details.down);
        if(details.down && this._keysDown.indexOf(details.name) === -1) this._keysDown.push(details.name);
        else if(!details.down) this._keysDown = this._keysDown.filter(function(n) { return (n !== details.down); } );
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
