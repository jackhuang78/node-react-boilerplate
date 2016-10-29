//==============================
//	Import required modules
//==============================
// the test driver
import gulp from 'gulp';
// transpiler for using es7 and react
import babel from 'gulp-babel';
import polyfill from 'babel-polyfill'; // to avoid 'ReferenceError: regeneratorRuntime is not defined' error
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import mocha from 'gulp-mocha';
import jsdoc from 'gulp-jsdoc';
import apidoc from 'gulp-api-doc';

//TODO: logger

gulp.task('default', () => {
	console.log('Hello World');
});

// remove the build directory
gulp.task('clean', () => {
	gulp.src(['build','doc'], {read:false})
		.pipe(clean());
});

// lint to check for syntax error / coding style
gulp.task('lint', () => {
	gulp.src(['src/**/*.js', 'spec*/**/*.js', './*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], () => {
	gulp.src('spec/**/*.spec.js')
		.pipe(mocha());
});

// build codes with babel and react
// browserify client-side code
gulp.task('build', ['lint'], () => {
	gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('build'));

	browserify('./src/main.js')
		.transform(babelify)
		.bundle()
		.pipe(source('bundle.js'))
		// .pipe(buffer())	// remove for development
		// .pipe(uglify())
		.pipe(gulp.dest('build'));
});

gulp.task('doc', ['build'], () => {
	const serverCode = ['build/**/*.js', '!**/views', '!**/bundle.js', '!**/main.js'];
	
	gulp.src(serverCode)
		.pipe(jsdoc('doc/js'));

	gulp.src(serverCode)
		.pipe(apidoc({markdown: false}))
		.pipe(gulp.dest('doc/rest'));
});

// run server
gulp.task('run', () => {
	nodemon({
		watch: ['build/**/*'],
		script: 'build/run.js',
		env: {PORT: 9999}
	}).on('restart', () => {
		console.log('app restarted');
	});
});