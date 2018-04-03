const AngularJS = [
    '**/*.module.js',
    '**/*.{constants.js,constant.js}',
    '**/*.provider.js',
    '**/*.config.js',
    '**/*.run.js',
    '**/*.filter.js',
    '**/*.controller.js',
    '**/*.directive.js',
    '**/*.service.js',
    '**/*.model.js',
    '**/*.factory.js',
];

const Templates = [
    '**/templates/**/*.tpl.html'
];

const Views = [
    '**/views/**/*.html',
    'index.html'
];

const Less = [
    '**/styles/**/*.less'
];

module.exports = {AngularJS, Templates, Views, Less};