'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var minify = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var size = require('gulp-size');
var autoprefixer = require('autoprefixer-core');
var browserSync = require('../util/browsersync');

module.exports = function(opts) {
    return function() {
        return gulp.src(opts.src)
            .pipe(sass())
            .pipe(postcss([
                autoprefixer({ browsers: ['last 2 versions'] })
            ]))
            .pipe(gulpif(opts.showSize, size({ title: 'css' })))
            .pipe(gulpif(opts.minify, minify({ restructuring: false })))
            .pipe(gulpif(opts.minify && opts.showSize, size({ title: 'css' })))
            .pipe(gulpif(opts.showSize, size({ title: 'css', gzip: true })))
            .pipe(gulp.dest(opts.dest))
            .pipe(browserSync.stream());
    };
};
