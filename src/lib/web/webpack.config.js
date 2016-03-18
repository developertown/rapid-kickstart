const Path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  src: Path.join(__dirname, 'src'),
  dist: Path.join(__dirname, 'dist')
};


const common = {
  context: __dirname,
  devtool: 'source-map',
  entry: PATHS.src,
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.json'],
    modulesDirectories: [
      'node_modules',
      Path.resolve(__dirname, './node_modules')
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: require.resolve("react"), loader: "expose?React" }
    ]
  },
  toolbox: {
    theme: 'src/theme.scss'
  },
  postcss: [ autoprefixer ]
};


if (TARGET === 'start' || !TARGET) {

  module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    module: {
      preLoaders: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['eslint'] }
      ],
      loaders: [
        { test: /\.s?css$/, loaders: ['style?sourceMap', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox'] }
      ]
    },
    devServer: {
      contentBase: PATHS.src,

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      stats: 'normal',

      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || 5000
    },
    plugins: [

    ]
  });

}


if (TARGET === 'dist') {
  module.exports = merge(common, {
    module: {
      loaders: [
        { test: /\.s?css$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap!toolbox') }
      ]
    },
    plugins: [
      new ExtractTextPlugin("bundle.css", { allChunks: true })
    ]
  });
}
