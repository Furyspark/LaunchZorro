var $Profiles = {};

$Profiles.profile = null;
$Profiles.subProfiles = {};

$Profiles.path            = {};
$Profiles.path.icon       = {};
$Profiles.path.icon.blank = "icons/profiles/generic/blank.png";

$Profiles.current          = {};
$Profiles.current.lhc      = "";
$Profiles.current.mouse    = "";
$Profiles.current.category = "";
$Profiles.current.profile  = "";


$Profiles.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Profiles.add = function(name) {
  var elem = document.createElement("div");
  elem.id = name.slice().replace(/[ ]/g, "_");
  elem.value = name;
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
  var dirName = "generic";
  var catElem = $Categories.getSelected();
  if(catElem) {
    var catDir = catElem.id;
    if(catDir.match(/category_([\w-]+)/)) {
      dirName = RegExp.$1.toLowerCase();
    }
  }
  var iconPath = "icons/profiles/" + dirName.toLowerCase() + "/" + name.toLowerCase() + ".png";
  fs.access(iconPath, fs.constants.F_OK, function(err) {
    var iconElem = document.createElement("img");
    if(!err) iconElem.src = process.cwd() + "/" + iconPath;
    else iconElem.src = process.cwd() + "/" + $Profiles.path.icon.blank;
    iconElem.width = "32";
    iconElem.height = "32";
    elem.insertBefore(iconElem, txtElem);
  });
  return elem;
};

$Profiles.refresh = function() {
  this.clear();
  var group = this.getProfiles();
  for(var a = 0;a < group.length;a++) {
    var item = group[a];
    var elem = this.add(item);
    if($Core.LHCElement().value === this.current.lhc && $Core.MouseElement().value === this.current.mouse &&
        $Categories.getSelected().value === this.current.category && item === this.current.profile) {
      this.selectElem(elem);
    }
  }
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
  var catElem = $Categories.getSelected();
  if(catElem) {
    var catDir = catElem.value;
    return "profiles/" + mouseDir + "/" + lhcDir + "/" + catDir + "/";
  }
  return "";
};

$Profiles.onSelect = function() {
  this.loadProfile();
};

$Profiles.loadProfile = function(url) {
  if(!url) {
    var selected = this.getSelected();
    if(selected && this.baseDir() !== "") {
      var profileName = selected.value;
      this.setProfileInfo(profileName);
      var profilePath = this.baseDir() + profileName + ".json";

      this.profile = new Profile(profilePath);

      // Set current data
      var lhc = $Core.LHCElement().value;
      var mouse = $Core.MouseElement().value;
      var category = $Categories.getSelected().value;
      var profile = profileName;
      this.current.lhc = lhc;
      this.current.mouse = mouse;
      this.current.category = category;
      this.current.profile = profile;
      // Add to recent profiles
      $Core.addRecentProfile(lhc, mouse, category, profile);
    }
  }
  else {
    var dirs = url.split(/[\/\\]/);
    var mouse = dirs[0];
    var lhc = dirs[1];
    var category = dirs[2];
    var profileName = dirs[3];
    var profilePath = "profiles/" + url + ".json";
    this.profile = new Profile(profilePath);
    this.setProfileInfo(profileName);
    // Set current data
    this.current.mouse = mouse;
    this.current.lhc = lhc;
    this.current.category = category;
    this.current.profile = profileName;
    this.refresh();
    // Add to recent profiles
    $Core.addRecentProfile(lhc, mouse, category, profileName);
  }
}

$Profiles.closeProfile = function() {
  if(this.profile) {
    this.profile.remove();
    this.profile = null;
    this.selectElem(null);
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
