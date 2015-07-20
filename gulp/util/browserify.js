var through = require('through2');
var browserify = require('browserify');

// https://github.com/substack/node-browserify/issues/1198#issuecomment-89948202
// https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
module.exports = function() {
    return through.obj(function(file, enc, cb) {
        browserify({ entries: file.path })
            .bundle(function(err, buf) {
                file.contents = buf;
                cb(null, file);
            });
    });
};
