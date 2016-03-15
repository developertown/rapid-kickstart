'use strict';

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
    new webpack.BannerPlugin(`#!/usr/bin/env node

    // I'm so sorry.
    //
    // Terrible hack.  __dirname is munged somewhere within webpack, and I haven't found a good solve for it yet.
    // this global circumvents what webpack is attempting to do, and gives the path to the directory in which
    // the actual kickstart.js script exists, and, more importantly, the static resources needed to copy at runtime.
    var DISTDIR = __dirname;

    `, {
      raw: true,
      entryOnly: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/lib/web',
        to: 'web',
        force: true
      }
    ], {})
  ]
};