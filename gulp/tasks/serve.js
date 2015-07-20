'use strict';

var browserSync = require('../util/browsersync');

module.exports = function(dir) {
    return function() {
        browserSync.init({
            server: {
                baseDir: dir,
                directory: false
            },
            ghostMode: true,
            notify: true
        });
    };
};
