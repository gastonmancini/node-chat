var gulp = require('gulp');
var jshint = require('gulp-jshint');
var paths = {
    scripts: ['gulpfile.js', 
			  'public/javascripts/**/*.js',
			  'lib/**/*.js']
};

gulp.task('lint', function () {
    return gulp.src(paths.scripts)
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

gulp.task('watch', function () {
	gulp.watch(paths.scripts, ['lint']);
});

gulp.task('default', ['watch']);