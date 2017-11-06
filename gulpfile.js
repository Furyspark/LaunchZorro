let gulp = require("gulp");
let gulpConcat = require("gulp-concat");
let fs = require("fs");

let compileData;

function readCompileData() {
  compileData = JSON.parse(fs.readFileSync("compile-data.json"));
  for(let type in compileData) {
    compileData[type].sources = compileData[type].sources.map(function(str) {
      return compileData[type].baseDir + str;
    });
  }
};

function buildTarget(type) {
  readCompileData();
  let data = compileData[type];
  return gulp.src(data.sources)
    .pipe(gulpConcat(data.target.fn))
    .pipe(gulp.dest(data.target.dir));
};

gulp.task("build-browser", function() {
  return buildTarget("browser");
});

gulp.task("build-editor", function() {
  return buildTarget("editor");
});

gulp.task("build-editorExtended", function() {
  return buildTarget("editorExtended");
});

gulp.task("build-main", function() {
  return buildTarget("main");
});

gulp.task("default", ["build-browser", "build-editor", "build-editorExtended", "build-main"]);
