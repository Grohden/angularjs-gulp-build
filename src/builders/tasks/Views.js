const WatchableBuilder = require('../WatchableBuilder');
const Globs = require('../../Globs');
const gulp = require('gulp');
const path = require("path");

class ViewsTask extends WatchableBuilder {

    onRegister(moduleName){
        return gulp.src(this.compileFiles);
    }

    getTaskName(moduleName){
        return `${moduleName}:views`;
    }

    /**
     * Transforms the given baseFolder to an angular pattern
     * @param {string} baseFolder a folder to be mapped to the angular glob pattern
     */
    addAngularFolderStructureToCompile(baseFolder){
        this.addFilesToCompile(
            Globs.Views.map(glob => path.join(baseFolder, glob))
        );
        return this;
    };
}
module.exports = ViewsTask;