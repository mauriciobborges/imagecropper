'use strict';

const chalk = require('chalk');
const gulp = require('gulp');

const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');

// PATHS
// Constants for folder paths in project
const paths = {
  src: './src',
  dist: './dist'
};
paths.srcJS = paths.src + '/js/**/*.js';

//
// TASKS: gulp tasks
//
gulp.task('default', () => {
  gutil.log(chalk.bold.green('Gulp Running!'));
});

// LINT
// See: .jshintrc configuration file (http://jshint.com/docs/options/)
gulp.task('lint', () => {
  return gulp.src(paths.srcJS)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', (error) => {
      var errorMessage = chalk.yellow.bold.bgRed(error.message,'To many errors!!');
      gutil.log(errorMessage);
    });
});
