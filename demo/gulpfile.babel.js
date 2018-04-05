const {Application, ApplicationRegister} = require('../index');


const AppModule = new Application('demo')
    .setOutputFolder('./build')
    .setTasks([
        new Application.Views()
            .setOutputName('demo.app.js')
            .addAngularFolderStructureToCompile('./app/'),
        new Application.Libs()
            .setOutputName('demo.libs.js')
            .addNodeDependencyPackage('ramda/dist/ramda')
    ]);

ApplicationRegister.register(AppModule);