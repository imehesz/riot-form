'use strict'

var _ = require('lodash')

var webpackConfig = _(require('./webpack.config'))
      .omit('entry', 'output')
      .assign({devtool: 'inline-sourcemap'})
      .value()

module.exports = function (config) {
  config.set({

    frameworks: ['mocha'],

    files: [
      'test/**/*_test.js'
    ],

    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: process.env.CI ? ['PhantomJS'] : ['Chrome'],

    singleRun: true,

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ]
  })
}
