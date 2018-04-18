const WatchableBuilder = require("../WatchableBuilder");
const Globs = require("../../Globs");
const gulp = require("gulp");
const path = require("path");
const gulpBabel = require("gulp-babel");
const cached = require("gulp-cached");
const remember = require("gulp-remember");
const concat = require("gulp-concat");

class ScriptsTask extends WatchableBuilder {
  onRegister(moduleName) {
    const taskName = this.getTaskName(moduleName);
    return gulp
      .src(this.compileFiles)
      .pipe(cached(taskName))
      .pipe(gulpBabel(require("../../../.babelrc")))
      .pipe(remember(taskName))
      .pipe(concat(this.outputFileName));
  }

  getTaskName(moduleName) {
    return `${moduleName}:scripts`;
  }

  /**
   * Transforms the given baseFolder to an angular pattern
   * @param {string} baseFolder a folder to be mapped to the angular glob pattern
   */
  addAngularFolderStructureToCompile(baseFolder) {
    this.addFilesToCompile(
      ...Globs.AngularJS.map(glob => path.join(baseFolder, glob))
    );
    return this;
  }
}
module.exports = ScriptsTask;
