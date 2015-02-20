'use strict';

var gulp = require('gulp');
var	$ = require('gulp-load-plugins')();
var del = require('del');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var runSequence = require('run-sequence');

var paths = {
    src: 'app',
    dist: 'dist'
};


// Builds the project and starts a local server
gulp.task('default', function(done) {
    runSequence('build', 'serve', done);
});


// Builds HTML, CSS, JS, and bumps project version
gulp.task('build', ['build:html', 'build:css', 'build:js', 'bump'], function() {
    return gulp.src(paths.dist + '/**')
        .pipe($.size({ showFiles: true }));
});


// Copies HTML files
gulp.task('build:html', function() {
    return gulp.src(paths.src + '/**/*.html')
        .pipe(gulp.dest(paths.dist));
});


// Compiles Sass files
gulp.task('build:css', function() {
    return gulp.src(paths.src + '/**/*.scss')
        .pipe($.sass({ outputStyle: 'compressed' }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.reload({ stream: true }));
});


// Compiles CommonJS into minified JS
gulp.task('build:js', ['jshint'], function() {
    return browserify('./' + paths.src + '/scripts/main.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe($.uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest(paths.dist));
});


// Check JS for errors
gulp.task('jshint', function() {
    return gulp.src([
        paths.src + '/**/*.js',
        'gulpfile.js',
        'package.json'
        ])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});


// Serves locals files in browsers
gulp.task('serve', function() {
    browserSync({
        server: { baseDir: paths.dist }
    });

    gulp.watch(paths.src + '/**/*.scss', ['build:css']);
    gulp.watch(paths.src + '/**/*.js', ['build:js', browserSync.reload]);
    gulp.watch(paths.src + '/**/*.html', ['build:html', browserSync.reload]);
});


// Deletes the dist directory
gulp.task('clean', function(done) {
    del([paths.dist], done);
});


// gulp bump --type major|minor|patch
// - Bumps up package.json version
gulp.task('bump', function() {
    var type = $.util.env.type || 'patch';
    return gulp.src('./package.json')
        .pipe($.bump({ type: type }))
        .pipe(gulp.dest('./'));
});

// TODO: Add testing tasks