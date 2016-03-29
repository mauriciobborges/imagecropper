'use strict';

const chalk = require('chalk');
const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const bower = require('gulp-bower');
const wiredep = require('wiredep').stream;

// PATHS
// Constants for folder paths in project
const paths = {
  src: './src',
  dist: './www/dist',
  public: './www'
};

paths.vendor = paths.dist + '/vendor';

paths.srcJS = paths.src + '/js/**/*.js';
paths.srcCSS = paths.src + '/css/**/*.css';

//
// TASKS: gulp tasks
//
gulp.task('default', ['lint', 'build:dev']);

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
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(concat('bundle.min.css'))
    .pipe(sourcemaps.write('../dist'))
    .pipe(gulp.dest(paths.dist))
    .on('end', (end) => {
      let log = chalk.bold.green('minified CSS files written on:', paths.dist);
      gutil.log(log);
    });
});

gulp.task('min', ['min:js', 'min:css']);

// Bower
// Instal bower dependencies on related .bowerrc.directory
gulp.task('bower:install', () => {
  bower()
  .on('end', () => {
    let log = chalk.bold.green('vendor sources installed on:', paths.vendor);
    gutil.log(log);
  });
});

gulp.task('bower:update', () => {
  bower({ cmd: 'update' })
  .on('end', () => {
    let log = chalk.bold.green('vendor sources updated');
    gutil.log(log);
  });
});

// Point index.html to vendor dependencies
gulp.task('bower:dep', () => {
  gulp.src(paths.public + '/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./www/'));
});

// Build
gulp.task('build:dev', ['bower:install', 'min'])
