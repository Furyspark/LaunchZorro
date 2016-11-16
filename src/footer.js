process.on("exit", function() {
  $Core.destroyInterception();
});


if(processType !== "node") {
  window.onload = function() {
    $Audio.addSound("reload", "assets/audio/profiler_reload.wav");
    $Audio.addSound("unload", "assets/audio/profiler_unload.wav");
    $Audio.addSound("refresh", "assets/audio/profiler_refresh.wav");
    $Audio.addSound("activate_profile", "assets/audio/activate_profile.wav");
    $Audio.addSound("deactivate_profile", "assets/audio/deactivate_profile.wav");
    $Core.start();
    // Load conf.json
    $Core.conf = $Core.generateConfig();
    $Core.fileExists("conf.json", function(result) {
      if(result) {
        var conf = JSON.parse(fs.readFileSync("conf.json"));
        Object.assign($Core.conf, conf);
      }
      $Core.onConfLoaded();
    });
  };
}
else {
  $Core.start();
  $Core.fileExists("conf.json", function(result) {
    if(result) {
      var conf = JSON.parse(fs.readFileSync("conf.json"));
      Object.assign($Core.conf, conf);
    }
    $Core.onConfLoaded();
  });
  // Auto load profile
  if(!cmdArgs.lhc) {
    cmdArgs.lhc = $Core.conf.defaultDevice.lhc;
  }
  if(!cmdArgs.mouse) {
    cmdArgs.mouse = $Core.conf.defaultDevice.mouse;
  }
  $Profiles.loadProfile(cmdArgs.mouse + "/" + cmdArgs.lhc + "/" + cmdArgs.category + "/" + cmdArgs.profile);
}
