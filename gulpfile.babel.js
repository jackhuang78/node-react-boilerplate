//==============================
//	Import required modules
//==============================
// THE build tool
import gulp from 'gulp';
// transpiler for using es7 and react
import babel from 'gulp-babel';
import babelify from 'babelify';
import polyfill from 'babel-polyfill'; // need to include this in every class for es7
// syntax and coding style
import eslint from 'gulp-eslint';
// delete files 
import clean from 'gulp-clean';
// source browserify and minify
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
// daemon
import nodemon from 'gulp-nodemon';
// test suite
import mocha from 'gulp-mocha';
// JS and REST documentation
import jsdoc from 'gulp-jsdoc';
import apidoc from 'gulp-api-doc';
// logging
import log4js from 'log4js';
import path from 'path';



let logger = log4js.getLogger(path.basename(__filename));

//TODO: logger, travis, readme, phantomjs

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
	gulp.src('spec/**/*.js')
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
		logger.info('app restarted');
	});
});