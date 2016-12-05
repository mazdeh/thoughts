// uncomment for hot-reloading!
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  // entry: [
  //   'webpack-hot-middleware/client',
  //   'webpack/hot/only-dev-server',
  //   './src/index'
  // ],
  output: {
    path: './dist',
    // publicPath: '/',
    // path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     __DEV__: true
  //   }),
  //   new webpack.NoErrorsPlugin(), // no bundle if errored
  //   new webpack.optimize.DedupePlugin(), // dependency
  //   new webpack.optimize.OccurenceOrderPlugin(), // bundle order
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  module: {
    loaders: [
      { test: /\.scss/, loader: 'style!css!sass' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
