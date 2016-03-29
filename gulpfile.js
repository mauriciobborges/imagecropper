'use strict';

const chalk = require('chalk');
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');

// PATHS
// Constants for folder paths in project
const paths = {
  src: './src',
  dist: './www/dist'
};
paths.vendorJS = paths.dist + '/vendor';

paths.srcJS = paths.src + '/js/**/*.js';
paths.srcCSS = paths.src + '/css/**/*.js';

//
// TASKS: gulp tasks
//
gulp.task('default', ['min']);

// LINT
// See: .jshintrc configuration file (http://jshint.com/docs/options/)
gulp.task('lint', () => {
  return gulp.src(paths.srcJS)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', (error) => {
      let errorMessage = chalk.yellow.bold.bgRed(error.message,'To many errors!!');
      gutil.log(errorMessage);
    });
});

// Uglify, Minify and generate Sourcemaps for JS files
gulp.task('min:js', () => {
  return gulp.src(paths.srcJS)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify({
        compress: {
            negate_iife: false
        }
    }))
    .pipe(rename('bundle.min.js'))
    .pipe(sourcemaps.write('../dist'))
    .pipe(gulp.dest(paths.dist))
    .on('end', (end) => {
      let log = chalk.bold.green('minified and sourcemap JS files written on:', paths.dist);
      gutil.log(log);
    });
});

// Minify and concat CSS files
gulp.task('min:css', () => {
  gulp.src(paths.srcCSS)
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
    .on('end', (end) => {
      let log = chalk.bold.green('minified CSS files written on:', paths.dist);
      gutil.log(log);
    });
});

gulp.task('min', ['min:js', 'min:css']);
