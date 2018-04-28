const { Application, ApplicationRegister } = require("../index");

const AppModule = new Application("demo")
  .setOutputFolder("./build")

  .setTasks(
    new Application.Views().addFolderStructure("./app/"),

    new Application.Scripts()
      .addFolderStructure("./app/")
      .setOutputFileName("demo.app.js"),

    new Application.Libs()
      .setOutputFileName("demo.libs.js")
      .addNodeDependencyPackages("ramda/dist/ramda"),

    new Application.Less()
      .setOutputFileName("demo.css")
      .addFilesToCompile("./app/styles/*.less")
  );

ApplicationRegister.register(AppModule);
