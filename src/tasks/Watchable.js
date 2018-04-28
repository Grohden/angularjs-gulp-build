const path = require("path");
const R = require("ramda");
const BasicBuilder = require("./Basic");

class WatchableBuilder extends BasicBuilder {
  constructor(name) {
    super(name);
    this.watchFiles = [];
    this.automaticWatchForCompile = true;
  }

  getWatchFiles() {
    return this.watchFiles;
  }

  /**
   * @description
   * Automatically sets compile files to watch
   *
   */
  disableAutomaticCompileWatch() {
    this.automaticWatchForCompile = false;
    return this;
  }

  /**
   * @description
   * Automatically sets compile files to watch
   * or if {@link WatchableBuilder#disableAutomaticCompileWatch} was called previously
   * behaves like {@link BasicBuilder#globs}
   */
  addFilesToCompile(...globs) {
    super.addFilesToCompile(...globs);

    if (this.automaticWatchForCompile) {
      this.watchFiles = R.concat(globs, this.watchFiles);
    }

    return this;
  }
}

module.exports = WatchableBuilder;
