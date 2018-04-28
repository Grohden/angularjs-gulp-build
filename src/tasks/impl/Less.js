const R = require("ramda");
const gulp = require("gulp");
const less = require("gulp-less");
const concat = require("gulp-concat");
const intoOneImportAll = require("../../plugins/into-one-import-all");
const WatchableBuilder = require("../Watchable");

const toLessImport = filePath => `@import "${filePath}";`;
/**
 * @name Less
 * @description
 * This class creates the styles for less by using a 'import all' vinyl file
 * and creates the watcher task for all included files.
 */
module.exports = class Less extends WatchableBuilder {
  constructor(name) {
    super(`[app]:${name || "styles"}`);
  }

  onRegister(moduleName) {
    return gulp
      .src(this.compileFiles)
      .pipe(intoOneImportAll({ concatenatingPaths: toLessImport }))
      .pipe(less())
      .pipe(concat(this.outputFileName));
  }
};
