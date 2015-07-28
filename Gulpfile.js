var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var del = require('del');
var copy = require('gulp-copy');
var sass = require('gulp-sass');
var util = require('gulp-util');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build', function() {
	return browserify('./src/js/app.js', { debug: true })
		.add(require.resolve('babel/polyfill'))
		.transform(babelify)
		.bundle()
		.on('error', util.log.bind(util, 'Browserify Error'))
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify({ mangle: false }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function() {
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('copy', function() {
	return gulp.src('./src/index.html')
		.pipe(copy('./dist/', {prefix: 1}));
});

gulp.task('clean', function() {
	del(['./dist/**/*']);
});

gulp.task('default', ['css', 'build', 'copy']);
