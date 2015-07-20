'use strict';

var $ = require('jquery');

module.exports = function(msg) {
    $('body').append('Hello2 ' + msg);
};
