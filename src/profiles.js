var $Profiles = {};

$Profiles.profile = null;
$Profiles.subProfiles = {};


$Profiles.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Profiles.add = function(name) {
  var elem = document.createElement("option");
  elem.value = name;
  elem.innerHTML = name;
  this.getElement().appendChild(elem);
};

$Profiles.refresh = function() {
  this.clear();
  var group = this.getProfiles();
  for(var a = 0;a < group.length;a++) {
    var item = group[a];
    this.add(item);
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
  return parent.options[parent.selectedIndex];
};

$Profiles.baseDir = function() {
  var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
  var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
  var catDir = $Categories.getSelected();
  if(catDir) {
    catDir = catDir.value;
    return "profiles/" + mouseDir + "/" + lhcDir + "/" + catDir + "/";
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
    if(this.profile) {
      this.profile.kill();
    }
    this.profile = spawn("Profiler_Test.exe", ["../" + profilePath], {shell: false, cwd: "profiler"});
  }
};

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
