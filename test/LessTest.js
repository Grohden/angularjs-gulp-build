const gulp = require("gulp");
const chai = require("chai");
const { expect } = chai;
const { Application, ApplicationRegister } = require("../index");
chai.use(require("chai-fs"));

ApplicationRegister.register(
  new Application("demo")
    .setOutputFolder("./build")
    .setTasks(new Application.Less(), new Application.Less("custom"))
);

describe("Less task class", function() {
  it("should generate less tasks", function() {
    expect(gulp.tasks).to.have.property("demo:styles");
    expect(gulp.tasks).to.have.property("demo:styles:watch");
  });

  it("should generate less task with custom name", function() {
    expect(gulp.tasks).to.have.property("demo:custom");
    expect(gulp.tasks).to.have.property("demo:custom:watch");
  });
});
