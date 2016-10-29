import gulp from 'gulp';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';

//TODO: mocha, jsdoc, logger

gulp.task('default', () => {
	console.log('Hello World');
	return;
});

// remove the build directory
gulp.task('clean', () => {
	return gulp.src('build', {read:false})
		.pipe(clean());
});

// lint to check for syntax error / coding style
gulp.task('lint', () => {
	return gulp.src(['src/**/*.js', 'spec*/**/*.js', './*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// build codes with babel and react
// browserify client-side code
gulp.task('build', ['clean', 'lint'], () => {
	gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('build'));

	return browserify('./src/main.js')
		.transform(babelify)
		.bundle()
		.pipe(source('bundle.js'))
		// .pipe(buffer())	// remove for development
		// .pipe(uglify())
		.pipe(gulp.dest('build'));
});

gulp.task('test', ['lint'], () => {
	return gulp.src('spec.integration/**/*.spec.js')
		.pipe(mocha());
});

// run server
gulp.task('run', () => {
	return nodemon({
		watch: ['build/**/*'],
		script: 'build/run.js',
		env: {PORT: 9999}
	}).on('restart', () => {
		console.log('app restarted');
	});
});