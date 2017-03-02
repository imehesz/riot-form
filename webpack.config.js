'use strict'

const path    = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    lib: ['./lib/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? 'riot-form.min.js' : 'riot-form.js',
    library: 'riotForm',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.tag$/,
      loader: 'riotjs-loader',
      exclude: /node_modules/,
      options: { type: 'none' }
    }, {
      test: /\.js|\.tag/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }, {test: /\.html$/, loader: 'html-loader'}]
  },
  resolve: {
    alias: {
      'riot-form': path.join(__dirname, './lib')
    }
  },
  externals: {
    riot: 'riot'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ]
}
