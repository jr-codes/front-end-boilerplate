'use strict';

var del = require('del');

module.exports = function(patterns) {
    return function(done) {
        del(patterns, done);
    };
};
