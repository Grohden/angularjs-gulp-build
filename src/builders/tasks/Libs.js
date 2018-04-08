const BasicBuilder = require('../BasicBuilder');
const Globs = require('../../Globs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const path = require('path');

class LibsTask extends BasicBuilder {
  onRegister(moduleName) {
    return gulp.src(this.compileFiles).pipe(concat(this.outputFileName));
  }

  getTaskName(moduleName) {
    return `${moduleName}:libs`;
  }

  /**
   * Resolves the dependency folder and add it to the concated file
   * @param {string} dependency the dependency that will be included
   * please note that it must be the built js module.
   *
   * @example addNodeDependencyPackage('ramda/dist/ramda')
   *
   */
  addNodeDependencyPackage(dependency) {
    this.addFileToCompile(require.resolve(dependency));
    return this;
  }
}
module.exports = LibsTask;
