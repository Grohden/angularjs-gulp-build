const BasicBuilder = require("../Basic");
const Globs = require("../../Globs");
const gulp = require("gulp");
const concat = require("gulp-concat");
const path = require("path");

class LibsTask extends BasicBuilder {
  constructor() {
    super();
    this.name = "[app]:libs";
  }

  onRegister(moduleName) {
    return gulp.src(this.compileFiles).pipe(concat(this.outputFileName));
  }

  /**
   * Resolves the dependencies folder and add it to the concated file
   * @param {Array<string>} dependencies the dependencies that will be included
   * please note that it must be the built js module.
   *
   * @example addNodeDependencyPackages('ramda/dist/ramda')
   *
   */
  addNodeDependencyPackages(...dependencies) {
    this.addFilesToCompile(...dependencies.map(require.resolve));
    return this;
  }
}
module.exports = LibsTask;
