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
  fs.writeFileSync("core-config.json", JSON.stringify(this._config));
}

ConfigManager.load = function() {
  fs.stat("core-config.json", function(err, stats) {
    if(err) {
      console.log(err);
      return;
    }
    if(stats.isFile()) {
      fs.readFile("core-config.json", function(err, data) {
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
    stats = fs.statSync("core-config.json");
  } catch(e) {
    // if(e) console.log(e);
  } finally {
    if(stats && stats.isFile()) this._config = JSON.parse(fs.readFileSync("core-config.json"));
    else ConfigManager.generateConfig();
  }
}


ConfigManager.load();
