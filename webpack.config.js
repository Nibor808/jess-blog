const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const path = require('path');
const ETPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = [ 'react', 'lodash', 'redux', 'react-redux', 'react-dom', 'redux-form', 'redux-thunk' ];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: ETPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        }),
        test: /\.scss$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor', 'manifest' ]
    }),
    new ETPlugin('style.css'),
    new HTMLPlugin({
      template: 'src/index.html'
    })
  ],
  devtool: 'source-map',
  resolve: {
    extensions: [ '*', '.js' ]
  },
  devServer: {
    contentBase: './dist'
  }
};