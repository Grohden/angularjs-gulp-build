const R = require("ramda");
const gulp = require("gulp");
const NamesRules = require("./NameRules");
const Views = require("./builders/tasks/Views");
const Libs = require("./builders/tasks/Libs");
const LessStyles = require("./builders/tasks/LessStyles");
const Scripts = require("./builders/tasks/Scripts");
const WatchableBuilder = require("./builders/WatchableBuilder");
const path = require("path");

class Application {
  /**
   *
   * @param {string} appName
   */
  constructor(appName) {
    this.appName = appName;
    this.outputAt = "./build";
    this.taskNames = [];
    this.watcherNames = [];
  }

  setTasks(...tasks) {
    this.tasks = tasks;
    return this;
  }

  setOutputFolder(folder) {
    this.outputAt = path.normalize(folder);
    return this;
  }

  registerAppTask(tasks) {
    gulp.task(this.appName, tasks);
  }

  registerModuleWatcher(watchers) {
    gulp.task(NamesRules.join(this.appName, "watch"), watchers);
  }

  registerGulpTask(name, dest, pipeline) {
    gulp.task(name, () => pipeline.pipe(gulp.dest(dest)));
  }

  registerWatcher(task) {
    const taskName = NamesRules.join(this.appName, task.taskPostfix);
    const watcherName = NamesRules.join(taskName, "watch");
    const runTask = [taskName];
    gulp.task(
      watcherName,
      runTask,
      () => gulp.watch(task.getWatchFiles(), runTask) //.on('change', deletionHandler(task.cacheName))
    );
  }

  register() {
    const { appName, tasks } = this;

    R.pipe(
      R.map(task => NamesRules.join(appName, task.taskPostfix)),
      R.unless(R.isEmpty, tasks => this.registerAppTask(tasks))
    )(tasks);

    R.pipe(
      R.filter(R.is(WatchableBuilder)),
      R.map(task => NamesRules.join(this.appName, task.taskPostfix, "watch")),
      R.unless(R.isEmpty, tasks => this.registerModuleWatcher(tasks))
    )(tasks);

    for (const task of tasks) {
      this.registerGulpTask(
        NamesRules.join(appName, task.taskPostfix),
        path.normalize(this.outputAt, task.getOutputName()),
        task.onRegister(this.appName)
      );

      if (task instanceof WatchableBuilder) {
        this.registerWatcher(task);
      }
    }
  }
}

Object.assign(Application, {
  Views,
  Scripts,
  Libs,
  LessStyles
});

module.exports = Application;
