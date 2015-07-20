'use strict';

module.exports = function(msg) {
    document.body.insertAdjacentHTML('beforeend', 'Hello ' + msg);
};
