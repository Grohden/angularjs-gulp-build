const path = require("path");
const R = require("ramda");

class BasicBuilder {
  constructor(taskName) {
    this.compileFiles = [];
    this.outputFileName = "./";
    this.name = taskName;
  }

  /**
   * @description
   * Sets the file outputname
   * @param {string} name - name of the resultant file
   */
  setOutputFileName(name) {
    this.outputFileName = name;
    return this;
  }

  getOutputName() {
    return this.outputFileName;
  }

  /**
   * @description
   * Concats a list of files/folder to the compile list
   * @param {Array.<string>} globs - paths, globs, or files to be added
   */
  addFilesToCompile(...globs) {
    this.compileFiles = R.concat(globs, this.compileFiles);

    return this;
  }

  /**
   * Transforms the given baseFolder to an angular pattern
   * @param {string} baseFolder a folder to be mapped to the angular glob pattern
   */
  addAngularFolderStructureToCompile(baseFolder) {
    throw "addAngularFolderStructureToCompile is not implemented by the builder class";
  }

  onRegister(moduleName) {
    throw "onRegister must be implemented by the builder class";
  }
}

module.exports = BasicBuilder;
