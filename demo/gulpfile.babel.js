const {Application, ApplicationRegister} = require('../index');


const AppModule = new Application('demo')
    .setOutputFolder('./build')
    .setTasks([
        new Application.Views()
            .setOutputName('demo.app.js')
            .addAngularFolderStructureToCompile('./app/')
    ]);

ApplicationRegister.register(AppModule);