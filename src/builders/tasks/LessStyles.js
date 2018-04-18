const R = require("ramda");
const gulp = require("gulp");
const less = require("gulp-less");
const concat = require("gulp-concat");
const intoOneImportAll = require("../../plugins/into-one-import-all");
const WatchableBuilder = require("../WatchableBuilder");

const toLessImport = filePath => `@import "${filePath}";`;

class LibsTask extends WatchableBuilder {
  onRegister(moduleName) {
    return gulp
      .src(this.compileFiles)
      .pipe(intoOneImportAll({ concatenatingPaths: toLessImport }))
      .pipe(less())
      .pipe(concat(this.outputFileName));
  }

  getTaskName(moduleName) {
    return `${moduleName}:styles`;
  }
}
module.exports = LibsTask;