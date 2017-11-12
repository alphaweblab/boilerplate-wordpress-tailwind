'use strict';

var projectName		= __dirname.split('/')[__dirname.split('/').length-1];

var gulp			= require('gulp');
var sass			= require('gulp-sass');
var postcss 		= require('gulp-postcss');
var copy			= require('gulp-copy');
var path			= require('path');
var tinypng			= require('gulp-tinypng');
var concat			= require('gulp-concat');
var minify			= require('gulp-minifier');
var clean 			= require('gulp-clean');
var autoprefixer 	= require('gulp-autoprefixer');
var tailwindcss 	= require('tailwindcss');
var browserSync		= require('browser-sync').create();

gulp.task('clean', function() {
	return 	gulp.src('./wp-theme/build', {read: false})
			.pipe(clean());
});

gulp.task('sync', ['clean'], function () {
	return 	gulp.src(['./wp-theme/source/**', '!./wp-theme/source/plugins', '!./wp-theme/source/plugins/**', '!./wp-theme/source/stylesheets/**', '!./wp-theme/source/scripts/**'], {dot: true})
			.pipe(gulp.dest('./wp-theme/build'));
});

gulp.task('sass', ['sync'], function () {
	return 	gulp.src('./wp-theme/source/stylesheets/master.scss')
			.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
			.pipe(gulp.dest('./wp-theme/build/stylesheets'));
});

gulp.task('postcss', ['sass'], function () {
	return 	gulp.src('./wp-theme/build/stylesheets/master.css')
			.pipe(postcss([
				tailwindcss('./wp-theme/source/scripts/tailwind.js'),
			]))
			.pipe(gulp.dest('./wp-theme/build/stylesheets'));
});

gulp.task('fonts', ['sync'], function () {
	return 	gulp.src('./wp-theme/source/fonts/*')
	  		.pipe(copy('./wp-theme/build/fonts', {prefix: 2}));
});

gulp.task('images', ['sync'], function () {
	return 	gulp.src(['./wp-theme/source/images/*.jpg', './wp-theme/source/images/*.png'])
	        .pipe(tinypng('w2lWbNviXvf2vp4OhLKNUOsexrAd0x-R'))
	        .pipe(gulp.dest('./wp-theme/build/images'));
});

gulp.task('plugins', ['sync'], function () {
	return 	gulp.src([
				'./wp-theme/source/plugins/jquery/dist/jquery.min.js'
			])
	        .pipe(concat('plugins.js'))
	        .pipe(gulp.dest('./wp-theme/build/scripts'));
});

gulp.task('scripts', ['plugins'], function () {
	return 	gulp.src([
				'./wp-theme/source/scripts/functions.js'
			])
	        .pipe(concat('functions.js'))
	        .pipe(gulp.dest('./wp-theme/build/scripts'));
});

gulp.task('stylesheets', ['postcss'], function () {
	return 	gulp.src([
				'./wp-theme/build/stylesheets/master.css'
			])
	        .pipe(concat('master.css'))
			.pipe(autoprefixer({
		            browsers: ['last 2 versions'],
		            cascade: false
			}))
	        .pipe(gulp.dest('./wp-theme/build/stylesheets'));
});

gulp.task('minify-css', ['stylesheets'], function () {
	return	gulp.src('./wp-theme/build/stylesheets/master.css')
			.pipe(minify({
				minify: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				minifyJS: true,
				minifyCSS: true,
			}))
			.pipe(gulp.dest('./wp-theme/build/stylesheets'));
});

gulp.task('minify-js', ['scripts'], function () {
	return	gulp.src('./wp-theme/build/scripts/*')
			.pipe(minify({
				minify: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				minifyJS: true,
				minifyCSS: true,
			}))
			.pipe(gulp.dest('./wp-theme/build/scripts'));
});

gulp.task('watch', ['default'], function() {
    browserSync.init({
		proxy: "localhost/"+projectName
	});
    gulp.watch("./wp-theme/source/**/*.scss", ['default']);
    gulp.watch("./wp-theme/source/**/*.php", ['default']);
	gulp.watch("./wp-theme/source/**/*.js", ['default']);
});

gulp.task('default', ['sass', 'postcss', 'plugins', 'scripts', 'stylesheets', 'sync', 'fonts'], function (done) {
	browserSync.reload();
    done();
});

gulp.task('build', ['default', 'minify-css', 'minify-js']);
gulp.task('build:image', ['default', 'images', 'minify-css', 'minify-js']);
