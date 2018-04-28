const WatchableBuilder = require("../Watchable");
const Globs = require("../../Globs");
const gulp = require("gulp");
const path = require("path");

class ViewsTask extends WatchableBuilder {
  constructor(name) {
    super(`[app]:${name || "views"}`);
  }

  onRegister(moduleName) {
    return gulp.src(this.compileFiles);
  }

  setOutputFileName(name) {
    throw `Can't set output name ${name} for view task because it doesn't generate a concated file, for that instead use the templates task.`;
  }

  getOutputName() {
    return "./";
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
