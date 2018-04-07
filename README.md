# angularjs-gulp-build
An pre-webpack world gulp build for AngularJS

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
If you try to write gulp tasks for every SPA inside your project, you will end up with a messy gulp file(s).

Say you need to create an SPA for a `dashboard`, you probably would end up with a gulpfile with some tasks like `dashboard, dashboard:watch, dashboard:views:watch, dashboard:views, dashboard:scripts:watch, dashboard:scripts ...`, ok, that is not hard to maintain, but what if i need those for a `documents` SPA too? you will end up cloning the tasks and changing some details like **what files to compile and where output the source**. If get really frustrated with all the duplicated gulp tasks definitions you would write a build tool like this...

## Why not use webpack, rollup and others?

To use those ones with AngularJS, you need to understand that the AngularJS DI system is almost obsolete, you would need to rewrite the existing code to be *importable* without breaking the legacy ones. I will not lie, that's a job that worth it, but it's a lot of work and if it's the first time that the team uses the import system, it will be hard do adapt.
