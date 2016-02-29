'use strict'

var path    = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    lib: ['./lib/index.js']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'riot-form.js',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.tag$/,
      loader: 'riotjs',
      exclude: /node_modules/,
      query: { type: 'none' }
    }],
    loaders: [{
      test: /\.js|\.tag/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({riot: 'riot'})
  ]
}
