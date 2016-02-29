'use strict';

var gulp             = require('gulp');
var path             = require('path');
var Karma            = require('karma').Server;
var webpack          = require('webpack-stream');

function runKarma(options, done) {
  var config = Object.assign(options, {configFile: path.join(__dirname, 'karma.conf.js')});
  var server = new Karma(config, done);
  server.start();
}

gulp.task('ci', function (done) {
  runKarma({singleRun: false, autoWatch: true}, done);
});


gulp.task('test', function (done) {
  runKarma({}, done);
});

gulp.task('webpack:watch', function () {
  return gulp.src('lib/index.js')
    .pipe(webpack(Object.assign(require('./webpack.config.js'), {watch: true})))
    .pipe(gulp.dest('./build'));
});
