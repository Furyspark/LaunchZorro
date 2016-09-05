var $Categories = {};

$Categories.clear = function() {
  var elem = this.getElement();
  while(elem.children.length > 0) {
    elem.removeChild(elem.firstChild);
  }
};

$Categories.add = function(name) {
  var elem = document.createElement("option");
  elem.value = name;
  elem.innerHTML = name;
  this.getElement().appendChild(elem);
};

$Categories.refresh = function() {
  var selected = this.getSelected();
  if(selected) selected = selected.value;
  this.clear();
  var cats = this.getCategoryDirectories();
  for(var a = 0;a < cats.length;a++) {
    var cat = cats[a];
    this.add(cat);
  }
  if(selected) this.select(selected);
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
  return parent.options[parent.selectedIndex];
};

$Categories.baseDir = function() {
  var mouseDir = $Core.devices.mice[$Core.MouseElement().value].dirName;
  var lhcDir = $Core.devices.lhc[$Core.LHCElement().value].dirName;
  return "profiles/" + mouseDir + "/" + lhcDir + "/";
};

$Categories.onSelect = function() {
  $Profiles.refresh();
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