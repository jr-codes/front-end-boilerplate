'use strict';

var gulp = require('gulp');
var tasks = require('./gulp/tasks');
var browserSync = require('./gulp/util/browsersync');

var config = {
    minify: false,
    showSize: false
};

gulp.task('default', ['build', 'serve']);

gulp.task('clean', tasks.clean('dist/**/*'));

gulp.task('build', ['html', 'css', 'js']);

gulp.task('html', tasks.buildHtml({
    src: 'src/**/*.html',
    dest: 'dist'
}));

gulp.task('css', tasks.buildCss({
    src: 'src/styles/*.scss',
    dest: 'dist/styles',
    minify: config.minify,
    showSize: config.showSize
}));

gulp.task('js', ['js:lint'], tasks.buildJs({
    src: 'src/scripts/*.js',
    dest: 'dist/scripts',
    minify: config.minify,
    showSize: config.showSize
}));

gulp.task('js:lint', tasks.validateJs([
    'src/scripts/**/*.js',
    'gulp/**/*.js',
    'gulpfile.js'
]));

gulp.task('serve', ['build', 'watch'], tasks.serve('dist'));

gulp.task('watch', ['watch:js'], function() {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/styles/**/*.scss', ['css']);
    gulp.watch('dist/**/*.{html,js}').on('change', browserSync.reload);
});

gulp.task('watch:js', tasks.buildJs({
    src: 'src/scripts/*.js',
    dest: 'dist/scripts',
    minify: config.minify,
    showSize: config.showSize,
    watch: true
}));
