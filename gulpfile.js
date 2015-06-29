var config = require('./lib/config/config');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var protractor = require("gulp-protractor").protractor;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var karma = require('karma').server;
var del = require('del');

var isProduction = true;
if (config.env === 'development') {
    isProduction = false;
}

var paths = { 
    scriptsFrontend: [
		'public/scripts/**/*.js', 
		'!public/build/**/*.js'],
	scriptsBackend: [
		'gulpfile.js',
		'lib/**/*.js'],
	stylesheets: [
		'public/stylesheets/**/*.css'
	],
	views: [
		'public/views/**/*.html'
	],
	testsFrontend: [
		'test/frontend-unit-tests/scenarios/**/*.js'
	],
	testsBackend: [
		'test/backend-unit-tests/**/*.js'
	],
	testsE2E: [
		'test/e2e-tests/**/*.js'
	]
};

// Minify css
gulp.task('minify-css', function() {
  return gulp.src(paths.stylesheets)
	 	.pipe(!isProduction ? sourcemaps.init() : gutil.noop())
	    .pipe(minifyCss())
		.pipe(rename({
			suffix: '.min'
		}))
	    .pipe(!isProduction ? sourcemaps.write() : gutil.noop())
	    .pipe(gulp.dest('public/build/stylesheets'));
});

// Analyze JavaScript code
gulp.task('lint', function () {
    return gulp.src(paths.scriptsFrontend.concat(paths.scriptsBackend))
        .pipe(jshint( { 
						"globals": {
						    "angular": false,
							"io": true,
							"strict": true,
							
						},
						"-W079": false // redefinition of 
					   }))
        .pipe(jshint.reporter('default'));
});

// Remove the build directory
gulp.task('clean', function(callback) {
	del(['build'], callback);
});

gulp.task('scripts', ['clean'], function() {
	// Minify and copy all JavaScript (except vendor scripts) with sourcemaps all the way down
	return gulp.src(paths.scriptsFrontend)
		.pipe(!isProduction ? sourcemaps.init() : gutil.noop())
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(!isProduction ? sourcemaps.write() : gutil.noop())
		.pipe(gulp.dest('public/build/scripts'));
});

// Restart service when a file change (nodemon)
gulp.task('nodemon', function() {
	nodemon({
		script: 'server.js',
		ext: 'html js',
		tasks: ['lint'] })
		.on('restart', function() {
			console.log('Server auto-restarted!');
		});
});

// Return the task when a file changes
gulp.task('watch', function () {
	gulp.watch(paths.scriptsBackend, ['lint', 'nodemon']);
	gulp.watch(paths.scriptsFrontend, ['lint', 'scripts']);
	gulp.watch(paths.stylesheets, ['minify-css']);
});

// Run frontend tests once and exit
gulp.task('test-frontend', function(done) {
    karma.start({
	    configFile: __dirname + '/test/frontend-unit-tests/karma.conf.js',
	    singleRun: true
  	}, done);
});

// Run backend tests once and exit
gulp.task('test-backend', function() {
	return gulp.src(paths.testsBackend)
        .pipe(mocha({
            reporter: 'nyan',
			require: [ __dirname + '/test/backend-unit-tests/server.js'],
            clearRequireCache: true,
            ignoreLeaks: true
    })).once('end', function () {
      process.exit();
    });
});

// Run the end-to-end tests
gulp.task('test-e2e', function(callback) {
	gulp.src(paths.testsE2E)
		.pipe(protractor({
			configFile: __dirname + '/test/e2e-tests/protractor.conf.js',
			args: []
		}))
		.on('error', function(e) { throw e; })
		.on('end', callback);
});

// Downloads the selenium webdriver
gulp.task('webdriver-update', webdriverUpdate);

// Watch for file changes and re-run tests on each change
/*gulp.task('tdd', function(done) {
    karma.start('test/frontend-unit-tests/karma.conf.js', done);
});*/

gulp.task('default', ['watch', 'scripts', 'minify-css']);