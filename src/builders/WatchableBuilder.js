const path = require('path');
const R = require('ramda');
const BasicBuilder = require('./BasicBuilder');

class WatchableBuilder extends BasicBuilder {
    
    constructor() {
        super();
        this.watchFiles = [];
        this.automaticWatchForCompile = true;
    }

    getWatchFiles(){
        return this.watchFiles;
    }

    /**
     * @description
     * Automatically sets compile files to watch
     * 
     */
    disableAutomaticCompileWatch(){
        this.automaticWatchForCompile = false;
        return this;
    };

    /**
     * @description
     * Automatically sets compile files to watch
     * or if {@link WatchableBuilder#disableAutomaticCompileWatch} was called previously
     * behaves like {@link BasicBuilder#globs}
     */
    addFilesToCompile(...globs){
        super.addFilesToCompile(...globs);

        if(this.automaticWatchForCompile){
            this.watchFiles = R.concat(
                globs,
                this.watchFiles
            );
        }

        return this;
    }

    getWatcherName(moduleName){
        return `${this.getTaskName(moduleName)}:watch`
    }
}


module.exports = WatchableBuilder;