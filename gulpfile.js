/* eslint-disable */
/* REQUIRES --------------------*/

var gulp       = require('gulp');
var error      = require('gulp-util');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS  = require('gulp-cssnano');
var webpack    = require('webpack-stream');

var src  = './src/';
var dist = './dist/';


/* SCRIPTS --------------------*/

// JS compiler
gulp.task('scripts', function() {
  gulp.src('/')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(dist));
});


/* STYLES --------------------*/

// Sass compiler
gulp.task('sass', function () {
  gulp.src(src + 'anim.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', error.log))
    .pipe(sourcemaps.write())
    .pipe(minifyCSS())
    .pipe(gulp.dest(dist));
});

/* DEFAULT --------------------*/

gulp.task('default', ['sass',  'scripts']);

/* WATCH --------------------*/
gulp.task('watch', function() {
  gulp.watch(src + '*.js', ['scripts']);
  gulp.watch(src + '*.scss', ['sass']);
});
