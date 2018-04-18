module.exports = {
  presets: ["env"].map(require.resolve),
  plugins: ["angularjs-annotate"].map(require.resolve)
};
