'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var minifyCSS = require('gulp-minify-css');
var karma = require('karma').server;
var browserify = require('gulp-browserify');

gulp.task('connect', function() {
    connect.server({
    root: 'app/',
    port: 8888
    });
});

gulp.task('clean', function() {
    gulp.src('dist/*')
        .pipe(clean({force: true}));
    gulp.src('app/bundled.js*')
        .pipe(clean({force: true}));
});

gulp.task('lint', ['clean'], function() {
    gulp.src(['app/**/*.js', '!app/bower_components/**', '!app/bundled.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('minify-js', ['clean'], function() {
   gulp.src(['app/**/*.js', '!app/bower_components/**'])
      .pipe(concat('combined.js'))
      .pipe(gulp.dest('dist'))
      .pipe(rename('combined.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/'));
});

gulp.task('minify-css', ['clean'], function() {
    var opts = {comments:true,spare:true};
    gulp.src(['app/**/*.css', '!./app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-bower-components', ['clean'], function () {
    gulp.src('app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('copy-html-files', ['clean'], function () {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('browserify', function() {
    gulp.src(['app/app.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat('bundled.js'))
        .pipe(gulp.dest('app/'));
});

gulp.task('watch', function() {
    gulp.watch(['app/**/*.js', '!app/bower_components/**', '!app/bundled.js'], ['lint', 'minify-js']);
    gulp.watch(['app/**/*.css', '!./app/bower_components/**'], ['minify-css']);
});

gulp.task('default', ['lint', 'browserify', 'watch', 'connect']);

gulp.task('build', ['lint', 'minify-css', 'minify-js', 'copy-html-files', 'copy-bower-components']);


// TESTING

// run unit tests once
gulp.task('unit', function (done) {
    karma.start({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, done);
});

// watch for file changes and re-run unit tests on each change
gulp.task('tdd', function (done) {
    karma.start({
    configFile: __dirname + '/tests/karma.conf.js'
    }, done);
});

// TODO: protractor tests
