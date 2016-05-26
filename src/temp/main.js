var test = require("./build/Release/interception");

var prof = new Profile();

var Core = test();
Core.start(prof.handleInterception.bind(prof));
