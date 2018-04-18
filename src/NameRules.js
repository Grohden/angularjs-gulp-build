const R = require("ramda");

const getName = R.curryN(2, (template, values) =>
  R.pipe(
    R.toPairs,
    R.map(([key, value]) => R.replace(new RegExp(`\\[${key}\\]`, "g"), value)),
    R.reduce((replaced, replacer) => replacer(replaced), template)
  )(values)
);

module.exports = {
  join: (...names) => R.join(":", names),
  getName
};
