'use strict';

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
  }
};