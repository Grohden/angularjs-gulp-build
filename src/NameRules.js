const R = require("ramda");

module.exports = {
  join: (...names) => R.join(":", names)
};
