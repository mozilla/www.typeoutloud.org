require('habitat').load();
var webpack = require('webpack');
var Path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['./dist/client.js','./less/index.less'],
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: Path.join('public')
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json-loader'], exclude: ['node_modules'] },
      { test: /\.less$/, loader: ExtractTextPlugin.extract(
                    'css?sourceMap!less?sourceMap'
                ), exclude: ['node_modules'] }
    ],
    preLoaders: [
      { test: /\.jsx$/, loaders: ['eslint-loader'], exclude: ['node_modules'] }
    ]
  },
  eslint: {
    emitError: true,
    emitWarning: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        APPLICATION_URI: process.env.APPLICATION_URI,
        DISABLE_INPUT: process.env.DISABLE_INPUT,
        GA_TRACKING_ID: process.env.GA_TRACKING_ID,
        ABORT_INTERNETHEALTH: process.env.ABORT_INTERNETHEALTH || false,
        ABORT_SCIENCE: process.env.ABORT_SCIENCE || false,
        ABORT_NET_NEUTRALITY: process.env.ABORT_NET_NEUTRALITY || false
      })
    }),
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ]
};
