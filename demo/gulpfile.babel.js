const {Application, ApplicationRegister} = require('../index');


const AppModule = new Application('demo')
    .setOutputFolder('./build')
    .setTasks([
        new Application.Views()
            .addAngularFolderStructureToCompile('./app/'),
        new Application.Libs()
            .setOutputName('demo.libs.js')
            .addNodeDependencyPackages('ramda/dist/ramda'),
    ]);

ApplicationRegister.register(AppModule);