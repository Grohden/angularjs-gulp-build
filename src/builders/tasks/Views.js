const WatchableBuilder = require("../WatchableBuilder");
const Globs = require("../../Globs");
const gulp = require("gulp");
const path = require("path");

class ViewsTask extends WatchableBuilder {
  onRegister(moduleName) {
    return gulp.src(this.compileFiles);
  }

  setOutputName(name) {
    throw `Can't set output name ${name} for view task because it doesn't generate a concated file, for that instead use the templates task.`;
  }

  getOutputName() {
    return "./";
  }

  getTaskName(moduleName) {
    return `${moduleName}:views`;
  }

  /**
   * Transforms the given baseFolder to an angular pattern
   * @param {string} baseFolder a folder to be mapped to the angular glob pattern
   */
  addAngularFolderStructureToCompile(baseFolder) {
    this.addFilesToCompile(
      ...Globs.Views.map(glob => path.join(baseFolder, glob))
    );
    return this;
  }
}
module.exports = ViewsTask;
