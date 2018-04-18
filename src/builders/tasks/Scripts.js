const WatchableBuilder = require("../WatchableBuilder");
const Globs = require("../../Globs");
const gulp = require("gulp");
const path = require("path");
const gulpBabel = require("gulp-babel");
const cached = require("gulp-cached");
const remember = require("gulp-remember");
const concat = require("gulp-concat");
const NamesRules = require("../../NameRules");

class ScriptsTask extends WatchableBuilder {
  constructor() {
    super();
    this.name = "[app]:scripts";
  }

  onRegister(appName) {
    const taskName = NamesRules.getName(this.name, { app: appName });
    return gulp
      .src(this.compileFiles)
      .pipe(cached(taskName))
      .pipe(gulpBabel(require("../../../.babelrc")))
      .pipe(remember(taskName))
      .pipe(concat(this.outputFileName));
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
