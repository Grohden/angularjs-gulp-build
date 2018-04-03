const R = require('ramda');
const gulp = require('gulp');
const Views = require('./builders/tasks/Views');
const WatchableBuilder = require('./builders/WatchableBuilder');
const path = require("path");

class Application {

    /**
     *
     * @param {string} appName
     */
    constructor(appName){
        this.appName = appName;
        this.outputAt = './build';
        this.taskNames = [];
        this.watcherNames = [];
    }

    setTasks(tasks){
        this.tasks = tasks;
        return this;
    }

    setOutputFolder(folder){
        this.outputAt = path.normalize(folder);
        return this;
    }

    registerModuleTask(tasks){
        gulp.task(this.appName, tasks);
    }

    registerModuleWatcher(watchers){
        gulp.task(`${this.appName}:watch`, watchers);
    }

    registerGulpTask(name, dest, pipeline){
        gulp.task(name, () => pipeline.pipe(gulp.dest(dest)));
    }

    registerWatcher(task){
        const watcherName = task.getWatcherName(this.appName);
        const runTasks = [task.getTaskName(this.appName)];
        gulp.task(
            watcherName,
            runTasks,
            () => gulp.watch(task.getWatchFiles(), runTasks) //.on('change', deletionHandler(task.cacheName))
        );
    }

    register(){
        const { appName, tasks } = this;

        R.pipe(
            R.map(t => t.getTaskName(this.appName)),
            R.unless(R.isEmpty, tasks => this.registerModuleTask(tasks))
        )(tasks);

        R.pipe(
            R.filter(R.is(WatchableBuilder)),
            R.map(t => t.getWatcherName(this.appName)),
            R.unless(R.isEmpty, tasks => this.registerModuleWatcher(tasks))
        )(tasks);

        for(const task of tasks){

            this.registerGulpTask(
                task.getTaskName(this.appName),
                path.normalize(this.outputAt, task.getOutputName()),
                task.onRegister(this.appName)
            );

            if(task instanceof WatchableBuilder){
                this.registerWatcher(task);
            }
        }
    }
}

Application.Views = Views;

module.exports = Application;