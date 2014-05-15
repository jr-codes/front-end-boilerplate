'use strict';

var gulp = require('gulp');
var	plugins = require('gulp-load-plugins')();
var	env = plugins.util.env;
var paths = {
	html: './app/**/*.html',
	sass: './app/styles/**/*.scss',
	js: './app/scripts/**/*.js',
	mainjs: './app/scripts/main.js',
	build: './build/'
};


gulp.task('default', ['build', 'watch']);

gulp.task('build', ['build:html', 'build:css', 'build:js']);

gulp.task('build:html', function() {
	return gulp.src(paths.html)
		.pipe(gulp.dest(paths.build))
		.pipe(plugins.size({ showFiles: true }));
});

gulp.task('build:css', function() {
	// --dev will skip minifying CSS
	var sassOptions = env.dev ? {} : { outputStyle: 'compressed' };

	return gulp.src(paths.sass)
		.pipe(plugins.sass(sassOptions))
		.pipe(plugins.autoprefixer('last 1 version'))
		.pipe(gulp.dest(paths.build))
		.pipe(plugins.size({ showFiles: true }));
});

gulp.task('build:js', ['jshint'], function() {
    var bundler = require('browserify');
    var source = require('vinyl-source-stream');
    var buffer = require('vinyl-buffer');
    var filename = paths.mainjs.split('/').pop();

    // --dev will skip minifying JS
    var uglify = function() {
        return env.dev ? plugins.util.noop() : plugins.uglify({ preserveComments: 'some' });
    };

    return bundler(paths.mainjs)
        .bundle()
        .pipe(source(filename))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.build))
        .pipe(plugins.size({ showFiles: true }));
});


gulp.task('jshint', function() {
	return gulp.src([paths.js, 'gulpfile.js'])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(require('jshint-stylish')));
});

gulp.task('connect', ['build'], function() {
	var app = require('connect')()
		.use(require('connect-livereload')({ port: 35729 }))
		.use(require('serve-static')(paths.build))
		.use(require('serve-index')(paths.build));

	require('http').createServer(app)
		.listen(9000)
		.on('listening', function() {
			console.log('Started server on http://localhost:9000');
		});

	require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect'], function() {
	var server = plugins.livereload();

    // Refresh browser when build files change
	gulp.watch([
		paths.build + '**/*.*'
	]).on('change', function(file) {
		server.changed(file.path);
	});

    // Rebuild files when source files change
	gulp.watch(paths.html, ['build:html']);
	gulp.watch(paths.sass, ['build:css']);
	gulp.watch(paths.js, ['build:js']);
});


gulp.task('clean', function() {
	return gulp.src(paths.build + '**/*.*', { read: false })
		.pipe(plugins.clean());
});

gulp.task('bump', function() {
	// If --major or --minor isn't set, bump version defaults to patch
	var type = env.major ? 'major' : (env.minor ? 'minor' : 'patch');

	return gulp.src('./package.json')
		.pipe(plugins.bump({ type: type }))
		.pipe(gulp.dest('./'));
});

// TODO: Add testing tasks