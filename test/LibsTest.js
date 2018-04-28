const gulp = require("gulp");
const chai = require("chai");
const { expect } = chai;
const { Application, ApplicationRegister } = require("../index");
chai.use(require("chai-fs"));

ApplicationRegister.register(
  new Application("demo")
    .setOutputFolder("./build")
    .setTasks(new Application.Libs())
);

describe("Libs task class", function() {
  it("should generate the libs task", function() {
    expect(gulp.tasks).to.have.property("demo:libs");
  });

  it("should NOT generate the libs task watcher", function() {
    expect(gulp.tasks).to.not.have.property("demo:libs:watch");
  });
});
