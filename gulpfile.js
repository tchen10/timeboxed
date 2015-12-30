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
var angularProtractor = require('gulp-angular-protractor');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

gulp.task('connect', function() {
    connect.server({
    root: 'app/',
    port: 8888
    });
});

gulp.task('connectDist', function() {
    connect.server({
    root: 'dist/',
    port: 9999
    });
});

gulp.task('clean', function() {
    gulp.src('dist/*')
        .pipe(clean({force: true}));
    gulp.src('app/bundled.js')
        .pipe(clean({force: true}));
    gulp.src('app/combined.js')
        .pipe(clean({force: true}));
});

gulp.task('lint', function() {
    gulp.src(['app/**/*.js', '!app/bower_components/**', '!app/bundled.js', '!app/combined.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('minify-js', function() {
   gulp.src(['app/**/*.js', '!app/bower_components/**'])
      .pipe(concat('combined.js'))
      .pipe(gulp.dest('app/'));
});

gulp.task('minify-js-dist', function() {
   gulp.src(['app/**/*.js', '!app/bower_components/**'])
      .pipe(concat('combined.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(rename('combined.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/'));
});

gulp.task('minify-css-dist', function() {
    var opts = {comments:true,spare:true};
    gulp.src(['app/**/*.css', '!./app/bower_components/**'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('dist/'));
});

gulp.task('copy-bower-components', function () {
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
});

gulp.task('dev', ['lint', 'browserify', 'minify-js', 'watch', 'connect']);

gulp.task('prod', ['lint', 'minify-css-dist', 'browserify', 'minify-js-dist', 'copy-html-files', 'copy-bower-components', 'connectDist']);


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

// run protractor tests
gulp.task('protractor', function (callback) {
    gutil.log("**RUNNING PROTRACTOR TESTS**");
    gulp.src('tests-e2e/*.spec.js')
        .pipe(angularProtractor({
            'configFile': 'tests-e2e/protractor.conf.js',
            'debug': false,
            'autoStartStopServer': true
        }))
        .on('error', function(e) {
            gutil.log(e);
        })
        .on('end', callback);
});

// run all tests
gulp.task('test', function() {
    runSequence(
        ['unit'],
        ['protractor']
    );
});
