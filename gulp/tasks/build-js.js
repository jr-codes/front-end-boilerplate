'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var size = require('gulp-size');
var uglify = require('gulp-uglify');

var browserifyTask = function(opts, tasks) {
    var browserify = require('../util/browserify');

    return function() {
        var stream = gulp.src(opts.src)
            .pipe(browserify());

        return tasks(stream);
    };
};

var watchifyTask = function(opts, tasks) {
    var globby = require('globby');
    var browserify = require('browserify');
    var watchify = require('watchify');
    var path = require('path');
    var _ = require('lodash');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var gutil = require('gulp-util');

    return function() {
        globby(opts.src, function(err, files) {
            files.forEach(function(file) {
                var filename = path.basename(file);
                var args = _.assign({ entries: file }, watchify.args);
                var bundler = watchify(browserify(args));

                var bundle = function() {
                    var stream = bundler.bundle()
                        .pipe(source(filename))
                        .pipe(buffer());

                    return tasks(stream);
                };

                bundler.on('update', bundle);
                bundler.on('log', gutil.log);

                return bundle();
            });
        });
    };
};

module.exports = function(opts) {
    var tasks = function(stream) {
        return stream
            .pipe(gulpif(opts.showSize, size({ title: 'js' })))
            .pipe(gulpif(opts.minify, uglify()))
            .pipe(gulpif(opts.minify && opts.showSize, size({ title: 'js' })))
            .pipe(gulpif(opts.showSize, size({ title: 'js', gzip: true })))
            .pipe(gulp.dest(opts.dest));
    };

    if (opts.watch) {
        return watchifyTask(opts, tasks);
    } else {
        return browserifyTask(opts, tasks);
    }
};
