const gulp = require("gulp");
const chai = require("chai");
const { expect } = chai;
const { Application, ApplicationRegister } = require("../index");

chai.use(require("chai-fs"));

ApplicationRegister.register(
  new Application("demo")
    .setOutputFolder("./build")
    .setTasks(new Application.Views())
);

describe("Views task class", function() {
  it("should generate the views task", function() {
    expect(gulp.tasks).to.have.property("demo:views");
  });

  it("should generate the views task watcher", function() {
    expect(gulp.tasks).to.have.property("demo:views:watch");
  });
});
