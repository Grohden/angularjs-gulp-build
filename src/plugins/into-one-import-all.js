const through = require("through");
const R = require("ramda");
const Vinyl = require("vinyl");

module.exports = function({ concatenatingPaths }) {
  let files = [];
  const toAllImportLessFile = R.compose(
    R.join("\n"),
    R.map(concatenatingPaths),
    R.pluck("path")
  );

  function onFile(file) {
    return files.push(file);
  }

  function onEnd() {
    const vinylFile = new Vinyl({
      cwd: "",
      base: __dirname,
      path: "fileName",
      contents: new Buffer(toAllImportLessFile(files))
    });

    this.emit("data", vinylFile);
    return this.emit("end");
  }

  return through(onFile, onEnd);
};
