class ApplicationRegister {
    static register(...applications){
        applications.forEach(a => a.register())
    }
}

module.exports = ApplicationRegister;