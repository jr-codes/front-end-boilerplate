'use strict';

var $ = require('jquery'),
    message = 'Hello World';

module.exports = function() {
    $('body').append(message);
};