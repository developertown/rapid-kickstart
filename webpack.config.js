'use strict';

var webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'kickstart.js',
    library: 'RapidKickstart',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new webpack.BannerPlugin("#!/usr/bin/env node", {
      raw: true,
      entryOnly: true
    })
  ]
};