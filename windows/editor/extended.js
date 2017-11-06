var ipcRenderer = require("electron").ipcRenderer;
var bind = null;

ipcRenderer.on("initialize", function(event, args) {
  Core.baseData = args.baseData;
  bind = args.bind;
  Core.start();
});


window.$ = window.jQuery = require("../../lib/jquery.js");
require("../../lib/jquery-ui.js");

function Core() {
  console.log("This is a static class.");
}

Core.start = function() {
  this.initJQuery();
  this.actions = [];
  this.bind = bind;
  this.fillActionList();
  this.setup(this.bind);
  this.refreshActionType();
}

Core.initJQuery = function() {
  // Press Group
  $("#group_press").sortable({
    handle: ".handle",
    update: function() {
      Core.sortGroup(Core.sequence.press);
    }
  });
  // Release Group
  $("#group_release").sortable({
    handle: ".handle",
    update: function() {
      Core.sortGroup(Core.sequence.release);
    }
  });
}

Core.setup = function(bind) {
  this.clear();
  this.initBind(bind);
  bind = null;
}

Core.elements = function() {
  var result = {};
  // Basic elements
  result.pressList = document.getElementById("group_press");
  result.releaseList = document.getElementById("group_release");
  result.actionList = document.getElementById("list_actions");
  // Action types
  result.actionTypes = {};
  result.actionTypes.key = document.getElementById("group_action_types_key");
  result.actionTypes.delay = document.getElementById("group_action_types_delay");
  // Return results
  return result;
}

Core.fillActionList = function(bind) {
  this.addAction({type: "key", name: "Keyboard: Left Arrow", key: "left"});
  this.addAction({type: "key", name: "Keyboard: Right Arrow", key: "right"});
  this.addAction({type: "key", name: "Keyboard: Up Arrow", key: "up"});
  this.addAction({type: "key", name: "Keyboard: Down Arrow", key: "down"});
  this.addAction({type: "key", name: "Keyboard: A", key: "a"});
  this.addAction({type: "key", name: "Keyboard: B", key: "b"});
  this.addAction({type: "key", name: "Keyboard: C", key: "c"});
  this.addAction({type: "key", name: "Keyboard: D", key: "d"});
  this.addAction({type: "key", name: "Keyboard: E", key: "e"});
  this.addAction({type: "key", name: "Keyboard: F", key: "f"});
  this.addAction({type: "key", name: "Keyboard: G", key: "g"});
  this.addAction({type: "key", name: "Keyboard: H", key: "h"});
  this.addAction({type: "key", name: "Keyboard: I", key: "i"});
  this.addAction({type: "key", name: "Keyboard: J", key: "j"});
  this.addAction({type: "key", name: "Keyboard: K", key: "k"});
  this.addAction({type: "key", name: "Keyboard: L", key: "l"});
  this.addAction({type: "key", name: "Keyboard: M", key: "m"});
  this.addAction({type: "key", name: "Keyboard: N", key: "n"});
  this.addAction({type: "key", name: "Keyboard: O", key: "o"});
  this.addAction({type: "key", name: "Keyboard: P", key: "p"});
  this.addAction({type: "key", name: "Keyboard: Q", key: "q"});
  this.addAction({type: "key", name: "Keyboard: R", key: "r"});
  this.addAction({type: "key", name: "Keyboard: S", key: "s"});
  this.addAction({type: "key", name: "Keyboard: T", key: "t"});
  this.addAction({type: "key", name: "Keyboard: U", key: "u"});
  this.addAction({type: "key", name: "Keyboard: V", key: "v"});
  this.addAction({type: "key", name: "Keyboard: W", key: "w"});
  this.addAction({type: "key", name: "Keyboard: X", key: "x"});
  this.addAction({type: "key", name: "Keyboard: Y", key: "y"});
  this.addAction({type: "key", name: "Keyboard: Z", key: "z"});
  this.addAction({type: "key", name: "Keyboard: Space", key: "space"});
  this.addAction({type: "key", name: "Keyboard: Tab", key: "tab"});
  this.addAction({type: "key", name: "Keyboard: `", key: "sc029"});
  this.addAction({type: "key", name: "Keyboard: 1", key: "1"});
  this.addAction({type: "key", name: "Keyboard: 2", key: "2"});
  this.addAction({type: "key", name: "Keyboard: 3", key: "3"});
  this.addAction({type: "key", name: "Keyboard: 4", key: "4"});
  this.addAction({type: "key", name: "Keyboard: 5", key: "5"});
  this.addAction({type: "key", name: "Keyboard: 6", key: "6"});
  this.addAction({type: "key", name: "Keyboard: 7", key: "7"});
  this.addAction({type: "key", name: "Keyboard: 8", key: "8"});
  this.addAction({type: "key", name: "Keyboard: 9", key: "9"});
  this.addAction({type: "key", name: "Keyboard: 0", key: "0"});
  this.addAction({type: "key", name: "Keyboard: -", key: "vkbd"});
  this.addAction({type: "key", name: "Keyboard: =", key: "vkbb"});
  this.addAction({type: "key", name: "Keyboard: Enter", key: "enter"});
  this.addAction({type: "key", name: "Keyboard: Backspace", key: "backspace"});
  this.addAction({type: "key", name: "Keyboard: Escape", key: "escape"});
  this.addAction({type: "key", name: "Keyboard: [", key: "vkdb"});
  this.addAction({type: "key", name: "Keyboard: ]", key: "vkdd"});
  this.addAction({type: "key", name: "Keyboard: \\", key: "vkdc"});
  this.addAction({type: "key", name: "Keyboard: ;", key: "vkba"});
  this.addAction({type: "key", name: "Keyboard: '", key: "vkde"});
  this.addAction({type: "key", name: "Keyboard: ,", key: "vkbc"});
  this.addAction({type: "key", name: "Keyboard: .", key: "vkbe"});
  this.addAction({type: "key", name: "Keyboard: /", key: "vkbf"});
  this.addAction({type: "key", name: "Keyboard: F1", key: "f1"});
  this.addAction({type: "key", name: "Keyboard: F2", key: "f2"});
  this.addAction({type: "key", name: "Keyboard: F3", key: "f3"});
  this.addAction({type: "key", name: "Keyboard: F4", key: "f4"});
  this.addAction({type: "key", name: "Keyboard: F5", key: "f5"});
  this.addAction({type: "key", name: "Keyboard: F6", key: "f6"});
  this.addAction({type: "key", name: "Keyboard: F7", key: "f7"});
  this.addAction({type: "key", name: "Keyboard: F8", key: "f8"});
  this.addAction({type: "key", name: "Keyboard: F9", key: "f9"});
  this.addAction({type: "key", name: "Keyboard: F10", key: "f10"});
  this.addAction({type: "key", name: "Keyboard: F11", key: "f11"});
  this.addAction({type: "key", name: "Keyboard: F12", key: "f12"});
  this.addAction({type: "key", name: "Keyboard: Left Shift", key: "lshift"});
  this.addAction({type: "key", name: "Keyboard: Left Control", key: "lctrl"});
  this.addAction({type: "key", name: "Keyboard: Left Alt", key: "lalt"});
  this.addAction({type: "key", name: "Keyboard: Left Windows", key: "lwin"});
  this.addAction({type: "key", name: "Keyboard: Right Shift", key: "rshift"});
  this.addAction({type: "key", name: "Keyboard: Right Control", key: "rctrl"});
  this.addAction({type: "key", name: "Keyboard: Right Alt", key: "ralt"});
  this.addAction({type: "key", name: "Keyboard: Right Windows", key: "rwin"});
  this.addAction({type: "key", name: "Keyboard: Caps Lock", key: "capslock"});
  this.addAction({type: "key", name: "Keyboard: Scroll Lock", key: "scrolllock"});
  this.addAction({type: "key", name: "Keyboard: Insert", key: "insert"});
  this.addAction({type: "key", name: "Keyboard: Delete", key: "delete"});
  this.addAction({type: "key", name: "Keyboard: Home", key: "home"});
  this.addAction({type: "key", name: "Keyboard: End", key: "end"});
  this.addAction({type: "key", name: "Keyboard: Page Up", key: "pgup"});
  this.addAction({type: "key", name: "Keyboard: Page Down", key: "pgdn"});
  this.addAction({type: "key", name: "Keyboard: Numpad 1", key: "numpad1"});
  this.addAction({type: "key", name: "Keyboard: Numpad 2", key: "numpad2"});
  this.addAction({type: "key", name: "Keyboard: Numpad 3", key: "numpad3"});
  this.addAction({type: "key", name: "Keyboard: Numpad 4", key: "numpad4"});
  this.addAction({type: "key", name: "Keyboard: Numpad 5", key: "numpad5"});
  this.addAction({type: "key", name: "Keyboard: Numpad 6", key: "numpad6"});
  this.addAction({type: "key", name: "Keyboard: Numpad 7", key: "numpad7"});
  this.addAction({type: "key", name: "Keyboard: Numpad 8", key: "numpad8"});
  this.addAction({type: "key", name: "Keyboard: Numpad 9", key: "numpad9"});
  this.addAction({type: "key", name: "Keyboard: Numpad 0", key: "numpad0"});
  this.addAction({type: "key", name: "Keyboard: Numpad Enter", key: "numpadenter"});
  this.addAction({type: "key", name: "Keyboard: Numpad +", key: "numpadadd"});
  this.addAction({type: "key", name: "Keyboard: Numpad -", key: "numpadsub"});
  this.addAction({type: "key", name: "Keyboard: Numpad *", key: "numpadmult"});
  this.addAction({type: "key", name: "Keyboard: Numpad /", key: "numpaddiv"});
  this.addAction({type: "delay", name: "Delay", key: "delay"});
}

Core.onActionChange = function() {
  this.refreshActionType();
}

Core.refreshActionType = function() {
  var action = this.getActionListAction();
  var elements = this.elements();
  for(var a in elements.actionTypes) {
    var elem = elements.actionTypes[a];
    if(a !== action.type) elem.style.display = "none";
    else elem.style.display = "block";
  }
}

Core.getHandleSource = function(dbAction, params) {
  if(dbAction.type === "key") {
    if(params[0]) return "img/key_press.png";
    else return "img/key_release.png";
  } else if(dbAction.type === "delay") {
    return "img/delay.png";
  }
  return "";
}

Core.getNewAction = function() {
  var dbAction = this.getActionListAction();
  var params = this.getActionTypeParams(dbAction);
  var action = new Action();
  var elems = this.createActionElement(dbAction, params);
  action.setType(dbAction.type);
  action.setKey(dbAction.key);
  for(var a = 0;a < params.length;a++) action.setParam(a, params[a]);
  action.elements = elems;
  action.elements.handle.src = this.getHandleSource(dbAction, params);
  return action;
}

Core.getActionListAction = function() {
  var elements = this.elements();
  for(var a = 0;a < elements.actionList.children.length;a++) {
    var opt = elements.actionList.children[a];
    if(opt.selected) return this.actions[a];
  }
  return null;
}

Core.getActionTypeParams = function(action) {
  var params = [];
  if(action.type === "key") {
    if(document.getElementById("group_action_type_key_press").checked) params = [true];
    else params = [false];
  }
  else if(action.type === "delay") {
    params = [parseInt(document.getElementById("group_action_type_delay_main").value) || 100];
  }
  return params;
}

Core.addAction = function(conf) {
  this.actions.push(conf);
  var elem = document.createElement("option");
  elem.value = conf.key;
  elem.innerHTML = conf.name;
  this.elements().actionList.appendChild(elem);
}

Core.getDbAction = function(type, key) {
  for(var a = 0;a < this.actions.length;a++) {
    var action = this.actions[a];
    if(action.type === type && action.key === key) return action;
  }
  return null;
}

Core.clear = function() {
  var elems = this.elements();
  while(elems.pressList.firstChild) {
    elems.pressList.removeChild(elems.pressList.firstChild);
  }
  while(elems.releaseList.firstChild) {
    elems.releaseList.removeChild(elems.releaseList.firstChild);
  }
  this.sequence = {
    press: [],
    release: []
  };
}

Core.initBind = function(bind) {
  if(!bind.extended) return;
  if(!bind.extended.press) return;
  if(!bind.extended.release) return;
  var list = [
    {src: bind.extended.press, type: "press"},
    {src: bind.extended.release, type: "release"}
  ];
  for(var a = 0;a < list.length;a++) {
    var obj = list[a];
    for(var b = 0;b < obj.src.length;b++) {
      var srcAction = obj.src[b];
      var dbAction = this.getDbAction(srcAction.type, srcAction.key);
      if(dbAction) {
        var action = new Action();
        action.setType(srcAction.type);
        action.setKey(srcAction.key);
        for(var c = 0;c < srcAction.params.length;c++) action.setParam(c, srcAction.params[c]);
        var elements = this.createActionElement(dbAction, srcAction.params);
        action.elements = elements;
        action.elements.handle.src = this.getHandleSource(dbAction, srcAction.params);
        if(obj.type === "press") this.addToPress(action);
        else if(obj.type === "release") this.addToRelease(action);
      }
    }
  }
}

Core.sortGroup = function(group) {
  group.sort(function(a, b) {
    var aRect = a.elements.main.getBoundingClientRect();
    var bRect = b.elements.main.getBoundingClientRect();
    if(aRect.top < bRect.top) return -1;
    if(aRect.top > bRect.top) return 1;
    return 0;
  });
}

Core.addToPress = function(action) {
  this.sequence.press.push(action);
  document.getElementById("group_press").appendChild(action.elements.main);
}

Core.addToRelease = function(action) {
  this.sequence.release.push(action);
  document.getElementById("group_release").appendChild(action.elements.main);
}

Core.toPress = function() {
  var action = this.getNewAction();
  this.addToPress(action);
}

Core.toRelease = function() {
  var action = this.getNewAction();
  this.addToRelease(action);
}

Core.toRemove = function() {
  var elems = $(".actionlist_item.ui-selected").each(function(index) {
    Core.removeActionByElement(this);
  });
}

Core.removeActionByElement = function(elem) {
  var arrays = [this.sequence.press, this.sequence.release];
  for(var a = 0;a < arrays.length;a++) {
    var arr = arrays[a];
    for(var b = arr.length-1;b >= 0;b--) {
      var action = arr[b];
      if(action.elements.main === elem) {
        arr.splice(b, 1);
        $(action.elements.main).remove();
      }
    }
  }
}

Core.createActionElement = function(dbAction, params) {
  var mainElem = document.createElement("div");
  mainElem.className = "actionlist_item";
  // Handle
  var handleElem = document.createElement("img");
  handleElem.className = "handle";
  mainElem.appendChild(handleElem);
  // Contents
  var contentsElem = document.createElement("div");
  contentsElem.className = "actionlist_item_content";
  mainElem.appendChild(contentsElem);
  // Label
  var labelElem = document.createElement("p");
  labelElem.className = "actionlist_item_label";
  contentsElem.appendChild(labelElem);
  if(dbAction.type === "delay") labelElem.innerHTML = params[0].toString();
  else labelElem.innerHTML = dbAction.name;
  // Add selection handler
  mainElem.addEventListener("click", function() {
    $("#group_press").children().removeClass("ui-selected");
    $("#group_release").children().removeClass("ui-selected");
    $(this).addClass("ui-selected");
  });
  // Return results
  return {
    main: mainElem,
    contents: contentsElem,
    label: labelElem,
    handle: handleElem
  };
}

Core.toRaw = function() {
  var result = {
    press: [],
    release: []
  };
  var list = [
    {src: this.sequence.press, dest: result.press},
    {src: this.sequence.release, dest: result.release}
  ];
  for(var a = 0;a < list.length;a++) {
    var obj = list[a];
    for(var b = 0;b < obj.src.length;b++) {
      var action = obj.src[b];
      obj.dest.push(action.toRaw());
    }
  }
  return result;
}

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

window.onbeforeunload = function(ev) {
  ipcRenderer.send("extended", ["getextended", Core.toRaw()]);
}
