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
  fs.writeFile(this.getFileLocation(), JSON.stringify(this._config), (err) => {
    if(err) console.error(err);
  });
}

ConfigManager.load = function() {
  return new Promise((resolve, reject) => {
    fs.stat(ConfigManager.getFileLocation(), function(err, stats) {
      if(err && err.code !== "ENOENT") {
        reject(err);
        return;
      }
      else if(err && err.code === "ENOENT") {
        ConfigManager.generateConfig();
        resolve();
      }
      else {
        if(stats.isFile()) {
          fs.readFile(ConfigManager.getFileLocation(), function(err, data) {
            if(err) {
              reject(err);
              return;
            }
            this._config = JSON.parse(data);
            resolve();
          });
        }
      }
    });
  });

  // var stats;
  // try {
    // stats = fs.statSync(ConfigManager.getFileLocation());
  // } catch(e) {
    // // if(e) console.log(e);
  // } finally {
    // if(stats && stats.isFile()) this._config = JSON.parse(fs.readFileSync(ConfigManager.getFileLocation()));
    // else ConfigManager.generateConfig();
  // }
}

ConfigManager.getFileLocation = function() {
  return Core.dirs.electronRoot + "/core-config.json";
};
