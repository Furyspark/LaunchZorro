//------------------------------------------------------------------------------
// ConfigManager
//

function ConfigManager() {}

ConfigManager._config = {};

ConfigManager.generateConfig = function() {
  this._config = {
    startMinimized: false
  };
}

ConfigManager.save = function() {
  fs.writeFileSync(ConfigManager.getFileLocation(), JSON.stringify(this._config));
}

ConfigManager.load = function() {
  fs.stat(ConfigManager.getFileLocation(), function(err, stats) {
    if(err) {
      console.log(err);
      return;
    }
    if(stats.isFile()) {
      fs.readFile(ConfigManager.getFileLocation(), function(err, data) {
        if(err) {
          console.log(err);
          return;
        }
        this._config = JSON.parse(data);
      });
    }
  });

  var stats;
  try {
    stats = fs.statSync(ConfigManager.getFileLocation());
  } catch(e) {
    // if(e) console.log(e);
  } finally {
    if(stats && stats.isFile()) this._config = JSON.parse(fs.readFileSync(ConfigManager.getFileLocation()));
    else ConfigManager.generateConfig();
  }
}

ConfigManager.getFileLocation = function() {
  return __dirname + "/core-config.json";
};


ConfigManager.load();
