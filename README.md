# angularjs-gulp-build
An pre-webpack world gulp build for AngularJS

## Warning: Under construction
This project is not published on NPM and is not 100% implemented.

## Damn, another one?

JS world rules ¯\\_(ツ)_/¯

The difference is:

This tool **provide flexible tools to easily build common gulp tasks**.
The tool is focused on AngularJS, but you can **build task builders** for other purposes.

The focus on AngularJS is the part where the tool provide default gulp task builders for:
* Copying views
* Processing templates and generating an template cache js file
* Compiling and transforming all the needed .js files into one (in the right order, because angularjs DI sucks)
* Compiling styles into one .css
* Packing libs (the old jquery ones or node packages)
* Creating watchers for all those tasks

## Why i wouldn't write myself those build tasks?

If you have a small project, you probably don't need this tool, but if you have a huge *MPA* (multipage application)
and don't want to write `import`, `require` or simply *don't want to touch your js*, this tool should make your life easier.

Say you need to create an SPA for a `dashboard`, you probably would end up with a gulpfile with some tasks like `dashboard, dashboard:watch, dashboard:views:watch, dashboard:views, dashboard:scripts:watch, dashboard:scripts ...`, ok, that is not hard to maintain, but what 
if you need those for a `documents` SPA too? you will end up cloning the tasks and changing 
some details like **what files to compile and where output the source**.
 If you get really frustrated with all the duplicated gulp tasks 
 definitions you would write a build tool like this...

## Why not use webpack, rollup and others?

To use those ones with AngularJS, you need to understand that they make the AngularJS DI 
system almost obsolete, services, factories, providers, all of those becomes useless.
You would need to rewrite the existing code to be *importable* without breaking 
the legacy ones and maintain part of the already wrote AngularJS codes. 

I will not lie, that's a job that worth it, but it's 
a lot of work and if it's the first time that the team uses the import system,
it will be hard do adapt to the new concepts.

## Usage example

There are some examples on the demo folder, but
a 'simply' AngularJS task builder would be:

```javascript
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
```

This will generate the following tasks:
```
demo [demo:views, demo:libs]
demo:watch [demo:views:watch]
demo:views
demo:views:watch
demo:scripts
demo:libs
demo:styles
demo:styles:watch
```

