'use strict'

var gulp        = require('gulp')
var path        = require('path')
var Karma       = require('karma').Server
var webpack     = require('webpack-stream')
var connect     = require('connect')
var serveStatic = require('serve-static')
var http        = require('http')

function runKarma(options, done) {
  var config = Object.assign(options, {configFile: path.join(__dirname, 'karma.conf.js')})
  var server = new Karma(config, done)
  server.start()
}

gulp.task('ci', function (done) {
  runKarma({singleRun: false, autoWatch: true}, done)
})

gulp.task('test', function (done) {
  runKarma({singleRun: true, autoWatch: false}, done)
})

gulp.task('server', function () {
  var app = connect()
  app.use(serveStatic(path.resolve('./tests/integration/pages')))
  http.createServer(app).listen(process.env.PORT || 5050)
})

gulp.task('features', function (done) {
})

gulp.task('webpack:watch', function () {
  return gulp.src('lib/index.js')
    .pipe(webpack(Object.assign(require('./webpack.config.js'), {watch: true})))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', ['server', 'webpack:watch', 'ci'])
