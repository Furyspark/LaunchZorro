var Audio = {};

Audio._sounds = {};

Audio.addSound = function(key, filePath) {
  this._sounds[key] = new Howl({src: [filePath]});
};

Audio.play = function(key) {
  let snd = this._sounds[key];
  if(snd) {
    snd.play();
  }
};
