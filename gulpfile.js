var config = require('./lib/config/config');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
// Allows removal of files and dirs using globs -matching files using patterns.
var del = require('del');

var paths = {
    scriptsFrontend: [
		'public/javascripts/**/*.js', 
		'!public/build/**/*.js'],
	scriptsBackend: [
		'gulpfile.js',
		'lib/**/*.js']
};

// Analyze JavaScript code
gulp.task('lint', function () {
    return gulp.src(paths.scriptsFrontend)
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
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/build/javascripts'));
});

// Return the task when a file changes
gulp.task('watch', function () {
	gulp.watch(paths.scriptsBackend, ['lint']);
	gulp.watch(paths.scriptsFrontend, ['lint', 'scripts']);
});


gulp.task('default', ['watch', 'scripts']);