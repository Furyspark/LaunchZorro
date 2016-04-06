var fs = require("fs");
var concat = require("concatenate-files");

var sources = JSON.parse(fs.readFileSync("sources.json"));

concat(sources, "app.js", {}, function() {
});
