var $Categories = {};

$Categories.path            = {};
$Categories.path.icon       = {};
$Categories.path.icon.blank = "icons/categories/blank.png";

$Categories.current          = {};
$Categories.current.lhc      = "";
$Categories.current.mouse    = "";
$Categories.current.category = "";

$Categories.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Categories.add = function(name) {
  var elem = document.createElement("div");
  elem.id = "category_" + name.slice().replace(/[ ]/g, "_");
  elem.value = name;
  elem.className = "group_option";
  elem.style.background = $Core.color.category_unselected;
  elem.onclick = function(e) {
    $Categories.selectElem(this);
    $Categories.onSelect();
  }.bind(elem);
  this.getElement().appendChild(elem);
  // Add label
  var txtElem = document.createElement("span");
  txtElem.innerHTML = name;
  elem.appendChild(txtElem);
  // Add icon
  var iconPath = "icons/categories/" + name.toLowerCase() + ".png";
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

$Categories.refresh = function() {
  this.clear();
  var cats = this.getCategoryDirectories();
  for(var a = 0;a < cats.length;a++) {
    var cat = cats[a];
    var elem = this.add(cat);
    if($Core.LHCElement().value === this.current.lhc && $Core.MouseElement().value === this.current.mouse &&
        cat === this.current.category) {
      this.selectElem(elem);
    }
  }
};

$Categories.getCategoryDirectories = function() {
  var baseDir = this.baseDir();
  return fs.readdirSync(baseDir).filter(function(file) {
    return fs.lstatSync(path.resolve(baseDir, file)).isDirectory();
  });
};

$Categories.getElement = function() {
  return document.getElementById("profiles_categories");
};

$Categories.getSelected = function() {
  var parent = this.getElement();
  for(var a = 0;a < parent.children.length;a++) {
    var elem = parent.children[a];
    if(elem.selected) return elem;
  }
  return null;
};

$Categories.selectElem = function(elem) {
  var parent = this.getElement();
  for(var a = 0;a < parent.children.length;a++) {
    var child = parent.children[a];
    child.selected = false;
    child.style.background = $Core.color.category_unselected;
    if(child === elem) {
      child.selected = true;
      child.style.background = $Core.color.category_selected;
    }
  }
}

$Categories.baseDir = function() {
  var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
  var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
  return "profiles/" + mouseDir + "/" + lhcDir + "/";
};

$Categories.onSelect = function() {
  $Profiles.refresh();
  this.current.lhc = $Core.LHCElement().value;
  this.current.mouse = $Core.MouseElement().value;
  this.current.category = this.getSelected().value;
};

$Categories.select = function(value) {
  var nodes = this.getElement().childNodes;
  for(var a = 0;a < nodes.length;a++) {
    var node = nodes[a];
    if(node.value === value) {
      node.selected = true;
    }
  }
}
