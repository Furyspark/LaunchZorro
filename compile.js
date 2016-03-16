var fs = require("fs");
var concat = require("concat");
var spawn = require("child_process").spawn;

var sources = JSON.parse(fs.readFileSync("sources.json"));

concat(sources, "app.js", function(err) {
  spawn("electron", ["."]);
});
