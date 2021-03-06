'use strict'

const gulp        = require('gulp')
const path        = require('path')
const Karma       = require('karma').Server
const webpack     = require('webpack-stream')
const connect     = require('connect')
const serveStatic = require('serve-static')
const http        = require('http')
const cucumber    = require('gulp-cucumber')
const spawn       = require('child_process').spawn

let server
let webdriverProcess

function onExit() {
  if (server) {
    server.close()
  }
}

function runKarma(options, done) {
  const config = Object.assign(options, {configFile: path.join(__dirname, 'karma.conf.js')})
  new Karma(config, done).start()
}

gulp.task('ci', function (done) {
  runKarma({singleRun: false, autoWatch: true}, done)
})

gulp.task('test', function (done) {
  runKarma({singleRun: true, autoWatch: false}, function (err) {
    done(err)
    setTimeout(() => process.exit(err ? 1 : 0), 500)
  })
})

gulp.task('server', function () {
  const app = connect()
  app.use(serveStatic(path.resolve('./tests/fixtures')))
  server = http.createServer(app)
  server.listen(process.env.PORT || 5050)
})

gulp.task('features', ['server'], function (cb) {
  const proc = spawn('./node_modules/.bin/cucumber-js', ['tests/integration'])
  proc.stdout.on('data', function (data) {
    console.log(data.toString())
  })
  proc.stderr.on('data', function (data) {
    console.error(data.toString())
  })
  proc.on('exit', function (code) {
    onExit()
    cb(code === 0 ? null : new Error(`exited with code ${code}`))
  })
})

gulp.task('webpack:watch', function () {
  return gulp.src('lib/index.js')
    .pipe(webpack(Object.assign(require('./webpack.config.js'), {watch: true})))
    .pipe(gulp.dest('./dist'))
    .once('end', onExit)
})


gulp.task('watch', ['server', 'webpack:watch', 'ci'])
