
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require(path.join(__dirname, 'webpack.config.dev'));

const PORT = process.env['PORT'] || 5000;

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});
