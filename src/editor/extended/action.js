function Action() {
  this.initialize.apply(this, arguments);
}

Action.prototype.initialize = function() {
  this.initMembers();
}

Action.prototype.initMembers = function() {
  this._type = "key";
  this._key = "";
  this.elements = {};
  this.clearParams();
}

Action.prototype.type = function() {
  return this._type;
}

Action.prototype.setType = function(value) {
  var old = this._type;
  this._type = value;
  if(old !== value) {
    this.clearParams();
  }
}

Action.prototype.key = function() {
  return this._key;
}

Action.prototype.setKey = function(value) {
  this._key = value;
}

Action.prototype.param = function(index) {
  return this._params[index];
}

Action.prototype.setParam = function(index, value) {
  if(index < 0 || index >= this._params.length) return;
  this._params[index] = value;
}

Action.prototype.clearParams = function() {
  switch(this._type) {
    case "key":
      this._params = [true];
      break;
    case "delay":
      this._params = [100];
      break;
  }
}

Action.prototype.toRaw = function() {
  var result = {};
  result.type = this._type;
  result.key = this._key;
  result.params = this._params;
  return result;
}
