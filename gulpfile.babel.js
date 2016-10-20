import gulp from 'gulp';
import clean from 'gulp-clean';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';

import browserify from "browserify";
import source from "vinyl-source-stream";
import babelify from 'babelify';


gulp.task('default', () => {
	console.log('Hello World');
	return;
});

gulp.task('clean', () => {
	return gulp.src('build', {read:false})
		.pipe(clean());
})

gulp.task('build', ['clean'], () => {
	gulp.src('src/app.js')
		.pipe(babel())
		.pipe(gulp.dest('build'));

	return browserify('./src/main.js')
		.transform(babelify)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('run', () => {
	return nodemon({
		watch: ['build/**/*'],
		script: 'build/app.js',
		env: {PORT: 9999}
	}).on('restart', () => {
		console.log('app.js restarted');
	});
});