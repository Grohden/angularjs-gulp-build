const { Application, ApplicationRegister } = require("../index");

const AppModule = new Application("demo")
  .setOutputFolder("./build")

  .setTasks(
    new Application.Views().addAngularFolderStructureToCompile("./app/"),

    new Application.Scripts()
      .addAngularFolderStructureToCompile("./app/")
      .setOutputFileName("demo.app.js"),

    new Application.Libs()
      .setOutputFileName("demo.libs.js")
      .addNodeDependencyPackages("ramda/dist/ramda"),

    new Application.LessStyles()
      .setOutputFileName("demo.css")
      .addFilesToCompile("./app/styles/*.less")
  );

ApplicationRegister.register(AppModule);
