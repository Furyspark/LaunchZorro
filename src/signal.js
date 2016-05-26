function Signal() {
  this.initialize.apply(this, arguments);
}

Signal.prototype.constructor = Signal;

Signal.prototype.initialize = function() {
  this.initMembers();
}

Signal.prototype.initMembers = function() {
  this.listeners = [];
}

Signal.prototype.dispatch = function() {
  var arr = [];
  for(var a = 0;a < this.listeners.length;a++) {
    var listener = this.listeners[a];
    arr.push(listener);
    if(listener.once) {
      this.listeners.splice(a, 1);
      a--;
    }
  }

  for(var a = 0;a < arr.length;a++) {
    var listener = arr[a];
    if(listener.listener) listener.callback.apply(listener.listener, listener.arguments);
  }
}

Signal.prototype.remove = function(object, callback) {
  for(var a = 0;a < this.listeners.length;a++) {
    var listener = this.listeners[a];
    if(listener.listener === object && listener.callback === callback) {
      this.listeners.splice(a, 1);
      a--;
    }
  }
}

Signal.prototype.add = function(object, callback, arguments) {
  if(!arguments || !arguments instanceof Array) arguments = [];
  this.listeners.push({ listener: object, callback: callback, arguments: arguments, once: false });
}

Signal.prototype.addOnce = function(object, callback, arguments) {
  if(!arguments || !arguments instanceof Array) arguments = [];
  this.listeners.push({ listener: object, callback: callback, arguments: arguments, once: true });
}
