var $Profiles = {};

$Profiles.profile = null;
$Profiles.subProfiles = {};

$Profiles.path = {};
$Profiles.path.icon = {};
$Profiles.path.icon.blank = "icons/profiles/blank.png";


$Profiles.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Profiles.add = function(name) {
  var elem = document.createElement("div");
  elem.id = name.slice().replace(" ", "_");
  elem.className = "group_option";
  elem.style.background = $Core.color.profile_unselected;
  elem.onclick = function(e) {
    $Profiles.selectElem(this);
    $Profiles.onSelect();
  }.bind(elem);
  this.getElement().appendChild(elem);
  // Add label
  var txtElem = document.createElement("span");
  txtElem.innerHTML = name;
  elem.appendChild(txtElem);
  // Add icon
  var iconPath = "icons/profiles/" + name.toLowerCase() + ".png";
  fs.access(iconPath, fs.constants.F_OK, function(err) {
    var iconElem = document.createElement("img");
    if(!err) iconElem.src = iconPath;
    else iconElem.src = $Profiles.path.icon.blank;
    iconElem.width = "32";
    iconElem.height = "32";
    elem.insertBefore(iconElem, txtElem);
  });
};

$Profiles.refresh = function() {
  var selected = this.getSelected();
  if(selected) selected = selected.value;
  this.clear();
  var group = this.getProfiles();
  for(var a = 0;a < group.length;a++) {
    var item = group[a];
    this.add(item);
  }
  if(selected) this.select(selected);
};

$Profiles.getProfiles = function() {
  var baseDir = this.baseDir();
  if(baseDir !== "") {
    var result = fs.readdirSync(baseDir).filter(function(file) {
      return fs.lstatSync(path.resolve(baseDir, file)).isFile() &&
        path.extname(path.resolve(baseDir, file)) === ".json";
    });
    for(var a = 0;a < result.length;a++) {
      result[a] = path.basename(result[a], path.extname(result[a]));
    }
    return result;
  }
  return [];
};

$Profiles.getElement = function() {
  return document.getElementById("profiles_profiles");
};

$Profiles.getSelected = function() {
  var parent = this.getElement();
  for(var a = 0;a < parent.children.length;a++) {
    var elem = parent.children[a];
    if(elem.selected) return elem;
  }
  return null;
};

$Profiles.selectElem = function(elem) {
  var parent = this.getElement();
  for(var a = 0;a < parent.children.length;a++) {
    var child = parent.children[a];
    child.selected = false;
    child.style.background = $Core.color.profile_unselected;
    if(child === elem) {
      child.selected = true;
      child.style.background = $Core.color.profile_selected;
    }
  }
}

$Profiles.select = function(value) {
  var nodes = this.getElement().childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(node.value === value) {
      node.selected = true;
    }
  }
}

$Profiles.baseDir = function() {
  var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
  var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
  var catDir = $Categories.getSelected().id;
  if(catDir.match(/category_([\w-]+)/)) {
    return "profiles/" + mouseDir + "/" + lhcDir + "/" + RegExp.$1 + "/";
  }
  return "";
};

$Profiles.onSelect = function() {
  this.loadProfile();
};

$Profiles.loadProfile = function() {
  var selected = this.getSelected();
  if(selected && this.baseDir() !== "") {
    var profileName = selected.value;
    this.setProfileInfo(profileName);
    var profilePath = this.baseDir() + profileName + ".json";

    this.closeProfile();

    this.profile = new Profile(profilePath);

    // if(this.profile) {
    //   this.profile.kill();
    // }
    // this.profile = spawn("Profiler_Test.exe", ["../" + profilePath], {shell: false, cwd: "profiler"});
  }
};

$Profiles.closeProfile = function() {
  if(this.profile) {
    this.profile.remove();
    this.profile = null;
  }
}

$Profiles.setProfileInfo = function(name) {
  var elem = document.getElementById("info_current_profile");
  elem.innerHTML = "Current Profile: " + name;
};

$Profiles.launchCapsF13 = function() {
  console.log("CapsF13");
  var sub = this.subProfiles["capsf13"];
  if(sub) sub.kill();
  sub = spawn("CapsF13.exe", [], {shell: false, cwd: "profiler"});
  this.subProfiles["capsf13"] = sub;
};
