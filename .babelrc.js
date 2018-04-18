module.exports = {
  presets: ["babel-preset-env"].map(require.resolve),
  plugins: ["babel-plugin-angularjs-annotate"].map(require.resolve)
};
