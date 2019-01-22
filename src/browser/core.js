var Core = {};

Core.color = {};
Core.color.profile_selected = "#FFC57F";
Core.color.profile_unselected = "white";
Core.color.category_selected = Core.color.profile_selected;
Core.color.category_unselected = Core.color.profile_unselected;

Core.devices = {};
Core.devices.lhc = {};
Core.devices.mice = {};
Core.devices.list = null;
Core.conf = {};

Core.DEVICE_TYPE_KEYBOARD = 0;
Core.DEVICE_TYPE_MOUSE    = 1;

Core.MOUSE_WHEEL_NONE = 0;
Core.MOUSE_WHEEL_V    = 1;
Core.MOUSE_WHEEL_H    = 2;

Core.MOUSE_MOVE_REL  = 0;
Core.MOUSE_MOVE_ABS  = 1;

Core._superGlobalProfile = null;
Core._globalProfile = null;

Core._recentProfiles = [];
Core._coreMsgTimeout = null;
Core._waitForWhitelistKey = false;

Core.onConfigLoaded = new Signal();
Core._configLoaded = false;

Core.baseData = null;



Core.start = function() {
  // Set important variables
  this._closing = false;

  // Initialize submodules
  KeyCodeTranslator.initialize();

  // Initialize modules
  let handlerName = this.getHandlerName();
  if(handlerName === "interception") {
    interceptionJS = require(this.dirs.appRoot + "/interception/interception");
  }
  else {
    grabzorro = require(this.dirs.appRoot + "/grabzorro/node-libevdev");
  }

  // Set up for Windows
  if(os.platform() === "win32") {
    Core.handler = interceptionJS();
    Core.handler.start(Core.handleInterception.bind(Core));
  }
  // Set up for Linux
  else if(os.platform() === "linux") {
    Core.handler = grabzorro;

    // Set up filter
    let filter = [
      "ID_INPUT_KEYBOARD",
      "ID_INPUT_MOUSE"
    ];

    // Get devices
    let devices = Core.handler.get_device_paths(filter);
    let devPaths = devices.map((obj) => { return obj.node_path; });

    // Create virtual device
    Core._virtDevIndex = Core.handler.libevdev_create_virtual_device();

    // Read from devices
    Core.handler.read_devices(
      devPaths,
      true,
      Core.handleGrabZorro.bind(Core),
      Core.endGrabZorro.bind(Core)
    );
  }

  //this.sendLowerPrivileges();
  //this.lowerPrivileges()
  //.catch((err) => { console.error(err); })
  //.then(() => {
    this.initFileStructure()
    .then((errors) => {
      this.postStart();
    });
  //});
};

Core.initFileStructure = function() {
  return new Promise((resolve) => {
    let tasks = 2;
    let errors = [];
    let taskDone = function(err) {
      tasks--;
      if(err) errors.push(err);
      if(tasks === 0) resolve(errors);
    };
    // Copy base whitelist
    Core.copyFile(nodePath.join(Core.dirs.appRoot, "whitelist.json"), nodePath.join(Core.dirs.appData, "whitelist.json"), true, err => {
      if(err) taskDone(err);
      else taskDone();
    });
    // Copy base icons
    ncp(Core.dirs.appRoot + "/baseicons", Core.dirs.appData + "/icons", err => {
      if(err) taskDone(err);
      else taskDone();
    });
  });
};

Core.postStart = function() {
  // Load configs
  fs.readFile(Core.dirs.appRoot + "/devices.json", (err, data) => {
    if(err) {
      console.error(err);
    }
    else {
      this.devices.list = JSON.parse(data.toString());

      // Add Left-Handed Controllers to the list of devices
      if(processType !== "node") {
        var groups = ["lhc", "mice"];
        for(var a = 0;a < groups.length;a++) {
          var groupName = groups[a];
          var group = Core.devices.list[groupName];
          for(var b = 0;b < group.length;b++) {
            var device = group[b];

            // Create element
            var elem = Core.addRadioButton("group_" + groupName, device.dirName, groupName, device.name);
            // Add click event
            if(groupName === "lhc") {
              elem.onchange = function() {
                Core.onLHCSelect();
              };
            } else if(groupName === "mice") {
              elem.onchange = function() {
                Core.onMouseSelect();
              };
            }

            // Set default check
            elem.firstChild.checked = false;
            if(b === 0) {
              elem.firstChild.checked = true;
            }

            // Append to list
            var obj = {
              name: device.name,
              dirName: device.dirName,
              element: elem
            };
            Core.devices[groupName][device.dirName] = obj;
          }
        }
      }

      Core.loadWhitelist();

      Core.loadConfig();
      Categories.refresh();
    }
  });

  // Load sounds
  Audio.addSound("reload", this.dirs.appRoot + "/assets/audio/profiler_reload.wav");
  Audio.addSound("unload", this.dirs.appRoot + "/assets/audio/profiler_unload.wav");
  Audio.addSound("refresh", this.dirs.appRoot + "/assets/audio/profiler_refresh.wav");
  Audio.addSound("activate_profile", this.dirs.appRoot + "/assets/audio/activate_profile.wav");
  Audio.addSound("deactivate_profile", this.dirs.appRoot + "/assets/audio/deactivate_profile.wav");

  // Core.setPriority();
};

Core.copyFile = function(src, dest, overwrite, callback) {
  fs.readFile(src, (err, data) => {
    if(err) callback(err);
    fs.stat(dest, (err, stat) => {
      if(err && err.code !== "ENOENT") callback(err);
      else if(err && err.code === "ENOENT") {
        fs.writeFile(dest, data, (err) => {
          if(err) callback(err);
          callback();
        });
      }
      else {
        if(err && err.code === "ENOENT" && overwrite) {
          fs.writeFile(dest, data, (err) => {
            if(err) callback(err);
            callback();
          });
        }
        else {
          callback();
        }
      }
    });
  });
};

Core.loadConfig = function() {
  let appDir = process.argv[0].split(/[\\\/]/).slice(0, -1).join("/");
  Core.createBaseDirectories()
  .then(() => {
    if(os.platform() !== "win32") {
      Core.createSymlink(Core.dirs.electronRoot + "/profiles", Core.dirs.appData + "/profiles")
      .then(() => {
        Core.createSymlink(Core.dirs.electronRoot + "/icons", Core.dirs.appData + "/icons");
      })
      .catch(err => {
        console.error(err);
      });
    }
  })
  .then(() => {
  })
  .catch(err => {
    console.error(err);
  });

  Core.loadRecentProfiles();
  Core.conf = Core.generateConfig();
  Core.fileExists(Core.dirs.electronRoot + "/conf.json", function(result) {
    if(result) {
      fs.readFile(Core.dirs.electronRoot + "/conf.json", function(err, data) {
        Core.conf = JSON.parse(data.toString());
        Core.onConfLoaded();
      });
    } else {
      Core.onConfLoaded();
    }
  });
}

Core.saveConfig = function() {
  fs.writeFile(this.dirs.electronRoot + "/conf.json", JSON.stringify(this.conf, null, 2), function(err) {} );
}

Core.fileExists = function(path, callback) {
  fs.access(path, fs.constants.R_OK, function(err) {
    var result = true;
    if(err) result = false;
    callback(result);
  });
}

Core.isDirectory = function(path, callback) {
  fs.lstat(path, function(err, stats) {
    var result = false;
    if(stats.isDirectory()) result = true;
    callback(result);
  });
}

Core.createBaseDirectories = function() {
  return new Promise(function(resolve, reject) {
    // Init data
    let miceDirs = [];
    for(let a in Core.devices.mice) { miceDirs.push(a); }
    let lhcDirs = [];
    for(let a in Core.devices.lhc) { lhcDirs.push(a); }
    let dirsToCreate = [];
    // Create profiles directories
    fs.mkdir(Core.dirs.appData + "/profiles", function(err) {
      if(err && err.code !== "EEXIST") reject(err);
      // Create mice directories
      for(let a = 0;a < miceDirs.length;a++) {
        let md = miceDirs[a];
        fs.mkdir(Core.dirs.appData + "/profiles/" + md, function(err2) {
          if(err && err.code !== "EEXIST") reject(err);
          // Create lhc directories
          for(let b = 0;b < lhcDirs.length;b++) {
            let ld = lhcDirs[b];
            let key = md + "/" + ld;
            dirsToCreate.push(key);
            fs.mkdir(Core.dirs.appData + "/profiles/" + md + "/" + ld, function(err3) {
              if(err3 && err3.code !== "EEXIST") reject(err);
              let keyIndex = dirsToCreate.indexOf(key);
              if(keyIndex >= 0) {
                dirsToCreate.splice(keyIndex, 1);
                if(dirsToCreate.length === 0) resolve();
              }
            });
          }
        });
      }
    });
  });
}

Core.createSymlink = function(from, to) {
  return new Promise(function(resolve, reject) {
    fs.symlink(from, to, "junction", function(err) {
      if(err && err.code !== "EEXIST") reject(err);
      resolve();
    });
  });
};

Core.generateConfig = function() {
  var result = {
    suspend_key: "f1",
    usingWhitelist: true,
    defaultDevice: {
      lhc: "normal",
      mouse: "normal"
    },
    startMinimized: false,
    blockCLISwitching: false
  };
  return result;
}

Core.setCoreMessage = function(msg, time) {
  if(this._coreMsgTimeout) window.clearTimeout(this._coreMsgTimeout);
  var elem = document.getElementById("core-message");
  elem.innerHTML = msg;
  if(time > 0) {
    this._coreMsgTimeout = window.setTimeout(function() {
      elem.innerHTML = "";
    }, time);
  }
}

Core.clearCoreMessage = function() {
  if(this._coreMsgTimeout) window.clearTimeout(this._coreMsgTimeout);
  document.getElementById("core-message").innerHTML = "";
}

Core.addRecentProfile = function(lhc, mouse, category, profile) {
  var test = this._recentProfiles.filter(function(obj) {
    if(obj.lhc !== lhc) return false;
    if(obj.mouse !== mouse) return false;
    if(obj.category !== category) return false;
    if(obj.profile !== profile) return false;
    return true;
  });
  if(test.length > 0) {
    var testObj = test[0];
    var index = this._recentProfiles.indexOf(testObj);
    this._recentProfiles.splice(index, 1);
    this._recentProfiles.unshift(testObj);
  } else {
    this._recentProfiles.unshift({
      lhc: lhc,
      mouse: mouse,
      category: category,
      profile: profile
    });
  }
  this.saveRecentProfiles();
  if(this._recentProfiles.length > 10) this._recentProfiles = this._recentProfiles.slice(0, 10);
  Core.sendRecentProfilesToMain();
}

Core.sendRecentProfilesToMain = function() {
  ipcRenderer.send("core", ["recentprofiles", this._recentProfiles]);
}

Core.loadGlobalProfiles = function() {
  // Load super global profile
  var superGlobalProfilePath = this.dirs.appData + "/profiles/global.json";
  this.fileExists(superGlobalProfilePath, function(result) {
    this._superGlobalProfile = null;
    if(result) this._superGlobalProfile = new Profile(superGlobalProfilePath);
  }.bind(this));
  // Load global profile
  var mouseDir = this.devices.mice[this.MouseElement().value].dirName;
  var lhcDir = this.devices.lhc[this.LHCElement().value].dirName;
  var globalProfilePath = this.dirs.appData + "/profiles/" + mouseDir + "/" + lhcDir + "/global.json";
  this.fileExists(globalProfilePath, function(result) {
    this._globalProfile = null;
    if(result) this._globalProfile = new Profile(globalProfilePath);
  }.bind(this));
}

Core.loadRecentProfiles = function() {
  fs.readFile(this.dirs.appData + "/recent.json", function(err, data) {
    if(err) {
      if(err.code !== "ENOENT") console.error(err);
      return;
    }
    this._recentProfiles = JSON.parse(data);
    Core.sendRecentProfilesToMain();
  }.bind(this));
}

Core.saveRecentProfiles = function() {
  fs.writeFile(this.dirs.appData + "/recent.json", JSON.stringify(this._recentProfiles), (err) => {
    console.error(err);
  });
}

Core.onConfLoaded = function() {
  if(processType !== "node") {
    var conf = Core.conf;
    var doRefresh = false;
    if(conf.defaultDevice && conf.defaultDevice.lhc) {
      Core.selectLHC(conf.defaultDevice.lhc);
      doRefresh = true;
    }
    if(conf.defaultDevice && conf.defaultDevice.mouse) {
      Core.selectMouse(conf.defaultDevice.mouse);
      doRefresh = true;
    }
    if(conf.usingWhitelist === true) {
      var elem = document.getElementById("profile-whitelist");
      elem.checked = true;
    }
    if(conf.linkOverwolf) {
      var elem = document.getElementById("checkbox-overwolf-server");
      elem.checked = true;
      Overwolf.startServer();
    }
    if(conf.blockCLISwitching) {
      var elem = document.getElementById("checkbox-block-cli-switching");
      elem.checked = true;
    }

    if(doRefresh) {
      Profiles.clear();
      Categories.refresh();
    }
  }
  Core.loadGlobalProfiles();

  Core._configLoaded = true;
  Core.checkConfig();
};

Core.checkConfig = function() {
  if(!this._configLoaded) return;
  if(!this.baseData) return;
  this.onConfigLoaded.dispatch();
}

Core.setPriority = function() {
  var processName = process.argv[0].split(/[\\\/]/).slice(-1)[0];
  var app = spawn("wmic", ["process", "where", "name=\"" + processName + "\"", "CALL", "setpriority", "\"high priority\""], { shell: true });
}

Core.selectLHC = function(value) {
  Core.devices.lhc[value].element.firstChild.checked = true;
}

Core.selectMouse = function(value) {
  Core.devices.mice[value].element.firstChild.checked = true;
}

Core.onLHCSelect = function() {
  Profiles.clear();
  Categories.refresh();
  Core.conf.defaultDevice = Core.conf.defaultDevice || {};
  Core.conf.defaultDevice.lhc = Core.LHCElement().value;
  Core.loadGlobalProfiles();
  Core.saveConfig();
};

Core.onMouseSelect = function() {
  Profiles.clear();
  Categories.refresh();
  Core.conf.defaultDevice = Core.conf.defaultDevice || {};
  Core.conf.defaultDevice.mouse = Core.MouseElement().value;
  Core.loadGlobalProfiles();
  Core.saveConfig();
};

Core.LHCElement = function() {
  for(var a in Core.devices.lhc) {
    var elem = Core.devices.lhc[a].element.firstChild;
    if(elem.checked) {
      return elem;
    }
  }
};

Core.MouseElement = function() {
  for(var a in Core.devices.mice) {
    var elem = Core.devices.mice[a].element.firstChild;
    if(elem.checked) {
      return elem;
    }
  }
};

Core.addRadioButton = function(parentId, key, groupKey, text) {
  var li = document.createElement("li");

  var label = document.createElement("label");
  li.appendChild(label);

  var elem = document.createElement("input");
  elem.type = "radio";
  elem.value = key;
  elem.name = groupKey;

  label.appendChild(elem);
  label.innerHTML += text;

  var parent = document.getElementById(parentId);
  parent.appendChild(li);

  return label;
};

Core.unloadProfile = function() {
  if(Profiles.profile) {
    Profiles.closeProfile();
    Profiles.setProfileInfo("N/A");
  }
  Audio.play("unload");
  Overwolf.sendMessage("No profile loaded");
};

Core.reloadProfile = function(noSound) {
  if(!noSound && noSound !== false) noSound = false;
  this.loadGlobalProfiles();
  Profiles.loadProfile();
  if(!noSound) Audio.play("reload");
};

Core.refreshProfiles = function(noSound) {
  if(!noSound && noSound !== false) noSound = false;
  Categories.refresh();
  Profiles.refresh();
  if(!noSound) Audio.play("refresh");
};

Core.detectRunning = function() {
  var tasklist = spawn("tasklist");
  var taskStr = "";
  tasklist.stdout.on("data", function(data) {
    taskStr += data.toString();
  });
  tasklist.stdout.on("end", function() {
    var tasks = taskStr.split(/[\n\r]+/);
    tasks = Core.parseTasks(tasks.slice(4));
  });
}

Core.handleGrabZorroTemp = function(ev, code, value, data, info) {
  let hwid = info.vendor_id + ":" + info.product_id;
  //console.log(hwid);
  let result = this.handler.libevdev_send_event(this._virtDevIndex, ev, code, value);
};

Core.handleGrabZorro = function(events, info) {
  let hwid = info.vendor_id + ":" + info.product_id;

  // Loop to alter events
  for(let a = 0;a < events.length;a++) {
    let ev = events[a];
    
    if(ev.type === EvDevDict.events.key) {
      let keyDown = (ev.value === EvDevDict.values.key.pressed);
      let keyName = KeyCodeTranslator.fromLinux(ev.code);
      let deviceType = EvDevDict.isMouseButton(ev.code) ? Core.DEVICE_TYPE_MOUSE : Core.DEVICE_TYPE_KEYBOARD;
      let prof = Profiles.profile;
      let overridden = false;

      // Wait for whitelist
      if(Core._waitForWhitelistKey) {
        events.splice(a, 1);
        a--;
        Core._waitForWhitelistKey = false;
        Core.addToWhitelist(null, Core.getHandlerName(), hwid);
        Core.onSelectWhitelistDevice();
        Core.saveWhitelist();
        Core.clearCoreMessage();
      }

      // Suspend profile
      else if(prof != null && keyName === Core.conf.suspend_key) {
        events.splice(a, 1);
        a--;
        if(keyDown) {
          prof.toggleSuspend();
        }
      }

      if(!overridden && prof != null && prof.shouldHandle(keyName, hwid, deviceType, {})) {
        events.splice(a, 1);
        a--;
        overridden = prof.isOverriding(keyName, hwid);
        prof.handleGrabZorro(keyName, ev.value, info, hwid);
      }
      if(!overridden && Core._globalProfile != null && Core._globalProfile.shouldHandle(keyName, hwid, deviceType, {})) {
        events.splice(a, 1);
        a--;
        overridden = Core._globalProfile.isOverriding(keyName, hwid);
        Core._globalProfile.handleGrabZorro(keyName, ev.value, info, hwid);
      }
      if(!overridden && Core._superGlobalProfile != null && Core._superGlobalProfile.shouldHandle(keyName, hwid, deviceType, { ignoreWhitelist: true })) {
        events.splice(a, 1);
        a--;
        overridden = Core._superGlobalProfile.isOverriding(keyName, hwid);
        Core._superGlobalProfile.handleGrabZorro(keyName, ev.value, info, hwid);
      }
    }
  }

  // Send events
  Core.handler.libevdev_send_events(Core._virtDevIndex, events);
};

Core.endGrabZorro = function() {
};

Core.handleInterception = function(keyCode, keyDown, keyE0, hwid, deviceType, mouseWheel, mouseMove, x, y) {
  var keyName = "";
  if(deviceType === Core.DEVICE_TYPE_KEYBOARD) keyName = Input.indexToString(keyCode, keyE0);
  else if(deviceType === Core.DEVICE_TYPE_MOUSE) keyName = Input.mouseIndexToString(keyCode);

  // HWID checking
  // if(keyDown && !this.isMouseMove(keyCode, mouseWheel)) console.log(hwid);
  // if(keyDown && !this.isMouseMove(keyCode, mouseWheel)) console.log(keyName);

  var sendDefault = true;
  var prof = Profiles.profile;
  var overridden = false;
  if(this._waitForWhitelistKey && keyCode > 0) {
    sendDefault = false;
    this._waitForWhitelistKey = false;
    this.addToWhitelist(null, this.getHandlerName(), hwid);
    this.onSelectWhitelistDevice();
    this.saveWhitelist();
    this.clearCoreMessage();
  }
  else if(!!prof && keyName === this.conf.suspend_key) {
    sendDefault = false;
    if(keyDown) {
      prof.toggleSuspend();
    }
  }
  if(!overridden && !!prof && prof.shouldHandle(keyName, hwid, deviceType, {})) {
    sendDefault = false;
    overridden = prof.isOverriding(keyName, hwid);
    prof.handleInterception(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y);
  }
  if(!overridden && !!this._globalProfile && this._globalProfile.shouldHandle(keyName, hwid, deviceType, {})) {
    sendDefault = false;
    overridden = this._globalProfile.isOverriding(keyName, hwid);
    this._globalProfile.handleInterception(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y);
  }
  if(!overridden && !!this._superGlobalProfile && this._superGlobalProfile.shouldHandle(keyName, hwid, deviceType, { ignoreWhitelist: true })) {
    sendDefault = false;
    overridden = this._superGlobalProfile.isOverriding(keyName, hwid);
    this._superGlobalProfile.handleInterception(keyCode, keyDown, keyE0, hwid, keyName, deviceType, mouseWheel, mouseMove, x, y);
  }
  if(sendDefault) {
    this.handler.send_default();
  }
}

Core.isMouseMove = function(keyCode, mouseWheel) {
  return (Input.isMouseString(keyCode) || mouseWheel === Core.MOUSE_WHEEL_H || mouseWheel === Core.MOUSE_WHEEL_V);
}

Core.parseTasks = function(tasks) {
  var result = [];
  for(var a = 0;a < tasks.length;a++) {
    var task = tasks[a];
    var taskDetails = task.split(/[ ]+/);
    var obj = {
      exe: taskDetails[0]
    };
    result.push(obj);
  }
  return result;
}

Core.options = function() {
  if(processType !== "node") {
    return {
      enableDefaults: document.getElementById("profile-enable-defaults").checked
    };
  }
  return {
    enableDefaults: false
  };
}

Core.onUsingWhitelistChange = function() {
  var elem = document.getElementById("profile-whitelist");
  this.conf.usingWhitelist = false;
  if(elem.checked) {
    this.conf.usingWhitelist = true;
  }
  this.saveConfig();
}

Core.initQuickField = function() {
  var groupElem = document.createElement("div");
  groupElem.className = "group";
  groupElem.id = "group_quickfield";
  document.body.appendChild(groupElem);
  for(var a = 0;a < 10;a++) {
    var elem = document.createElement("div");
    elem.className = "quickfield_item";
    elem.id = "quickfield_item" + a.toString();
    groupElem.appendChild(elem);
  }
}

Core.destroyInterception = function() {
  this.handler.destroy();
}

Core.openEditor = function() {
  ipcRenderer.send("core", ["editor", "open"]);
}

Core.buttonWhitelist = function() {
  this.setCoreMessage("Press a key or button on your desired device...");
  this._waitForWhitelistKey = true;
}

Core.buttonWhitelistRemove = function() {
  let device = $("#group-whitelist").val();
  if(!this._whitelist[device])
    return;
  let hwid = $("#group-whitelist-hwids").val();
  let handlerName = this.getHandlerName();
  if(this._whitelist[device][handlerName] == null)
    return;
  var index = this._whitelist[device][handlerName].indexOf(hwid);
  if(index === -1) return;
  this._whitelist[device][handlerName].splice(index, 1);
  $("#group-whitelist-hwids option:selected").remove();
  this.saveWhitelist();
}

Core.loadWhitelist = function() {
  this._whitelist = null;
  fs.readFile(this.dirs.appData + "/whitelist.json", function(err, data) {
    if(err) {
      if(err.code !== "ENOENT") console.error(err);
      this._whitelist = { lhc: [], mice: [] };
    }
    else {
      this._whitelist = JSON.parse(data);
      for(var a in this._whitelist) {
        this.addWhitelistDeviceToGroup(a);
      }
    }
    // Add unknown mice to whitelist
    for(var a in Core.devices.mice) {
      if(!this._whitelist[a] && a !== "normal") {
        this._whitelist[a] = [];
        this.addWhitelistDeviceToGroup(a);
      }
    }
    // Add unknown left-handed controllers to whitelist
    for(var a in Core.devices.lhc) {
      if(!this._whitelist[a] && a !== "normal") {
        this._whitelist[a] = [];
        this.addWhitelistDeviceToGroup(a);
      }
    }
    Core.onSelectWhitelistDevice();
  }.bind(this));
}

Core.saveWhitelist = function() {
  fs.writeFile(this.dirs.appData + "/whitelist.json", JSON.stringify(this._whitelist, null, 2), (err) => {
    if(err) console.error(err);
  });
}

Core.addToWhitelist = function(device, handler, hwid) {
  if(!device) device = this.getWhitelistDeviceElem().value;
  if(!this._whitelist) return;
  if(!this._whitelist[device]) this._whitelist[device] = {};
  if(!this._whitelist[device][handler]) this._whitelist[device][handler] = [];
  var index = this._whitelist[device][handler].indexOf(hwid);
  if(index === -1) {
    this._whitelist[device][handler].push(hwid);
    this.saveWhitelist();
  }
}

Core.addWhitelistDeviceToGroup = function(name) {
  var groupElem = document.getElementById("group-whitelist");
  var elem = document.createElement("option");
  elem.value = name;
  elem.innerHTML = name;
  groupElem.appendChild(elem);
}

Core.getWhitelistDeviceElem = function() {
  var group = document.getElementById("group-whitelist");
  for(var a = 0;a < group.children.length;a++) {
    var child = group.children[a];
    if(child.selected) return child;
  }
}

Core.onSelectWhitelistDevice = function() {
  let elem = this.getWhitelistDeviceElem();
  let handler = this.getHandlerName();
  if(elem) this.setWhitelistHwidList(elem.value, handler);
}

Core.setWhitelistHwidList = function(device, handler) {
  var group = document.getElementById("group-whitelist-hwids");
  var hwidList = this._whitelist[device][handler] || null;
  while(group.firstChild) {
    group.removeChild(group.firstChild);
  }
  if(hwidList === null) return;
  for(var a = 0;a < hwidList.length;a++) {
    var hwid = hwidList[a];
    var elem = document.createElement("option");
    elem.value = hwid;
    elem.innerHTML = hwid;
    group.appendChild(elem);
  }
}

Core.onBlockCLIChange = function() {
  var elem = document.getElementById("checkbox-block-cli-switching");
  this.conf.blockCLISwitching = elem.checked;
  this.saveConfig();
}

Core.getHandlerName = function() {
  if(os.platform() === "win32") return "interception";
  else if(os.platform() === "linux") return "grabzorro";
  return "";
};

Core.lowerPrivileges = function() {
  return new Promise((resolve, reject) => {
    if(os.platform() === "win32") {
      resolve();
      return;
    }
    else {
      fs.readFile(this.dirs.electronRoot + "/user.json", (err, data) => {
        if(err) {
          reject(err);
        }
        else {
          let user = JSON.parse(data.toString());
          try {
            process.setgid(user.group);
            process.setuid(user.name);
            console.log("Successfully dropped privileges");
            resolve();
          }
          catch(err) {
            console.error("Couldn't drop privileges! Be very careful!");
            reject();
          }
        }
      });
    }
  });
};

Core.sendLowerPrivileges = function() {
  ipcRenderer.send("lowerprivileges");
};


//-------------------------------------------------------------------
// Events
//

ipcRenderer.on("core", function(event, args) {
  if(args.length > 0) {
    var cmd = args.splice(0, 1)[0];
    switch(cmd.toUpperCase()) {
      case "CLOSE":
        Core._closing = true;
        ipcRenderer.send("core", ["close"]);
        break;
      case "PROFILE":
        if(args.length > 0 && args[0].toUpperCase() === "RELOAD") Core.reloadProfile(true);
        else if(args.length > 5 && args[0].toUpperCase() === "LOAD") {
          var f = function() {
            var lhc = args[1];
            if(lhc === "") {
              lhc = Core.LHCElement().value;
            }
            var mouse = args[2];
            if(mouse === "") mouse = Core.MouseElement().value;
            var category = args[3];
            var profile = args[4];
            var type = args[5];
            if(type.toUpperCase() === "CLI" && Core.conf.blockCLISwitching) return;
            Core.selectLHC(lhc);
            Core.onLHCSelect();
            Core.selectMouse(mouse);
            Core.onMouseSelect();
            Categories.select(category);
            Profiles.select(profile);
            Profiles.loadProfile(mouse + "/" + lhc + "/" + category + "/" + profile);
          };
          if(Core._configLoaded) f();
          else Core.onConfigLoaded.addOnce(f, this);
        }
        break;
      case "BASEDATA":
        Core.baseData = args[0];
        Core.dirs = Core.baseData.dirs;
        Core.start();
        break;
    }
  }
});


window.onbeforeunload = function(event) {
  if(!Core._closing) {
    ipcRenderer.send("core", ["window", "hide"]);
    event.returnValue = false;
  }
}
