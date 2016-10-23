var cmdArgs = {
  lhc: "",
  mouse: "",
  category: "",
  profile: ""
};

process.argv.forEach(function(value, index) {
  if(index > 1) {
    if(value.match(/lhc=([\w- ]+)/i)) {
      cmdArgs.lhc = RegExp.$1;
    }
    else if(value.match(/mouse=([\w- ]+)/i)) {
      cmdArgs.mouse = RegExp.$1;
    }
    else if(value.match(/category=([\w- ]+)/i)) {
      cmdArgs.category = RegExp.$1;
    }
    else if(value.match(/profile=([\w- ]+)/i)) {
      cmdArgs.profile = RegExp.$1;
    }
  }
});
