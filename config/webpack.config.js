const path = require('path');
const webpack = require('webpack');
const ETPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react',
  'redux',
  'react-redux',
  'react-dom',
  'redux-form',
  'redux-thunk',
  'jquery',
  'lodash'
];

module.exports = {
  entry: {
    main: path.join(__dirname, '../client/index.js'),
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [ 'react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.scss$/,
        use: ETPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.json/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg)/,
        use: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: [ '*', '.js' ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor', 'manifest' ]
    }),
    new ETPlugin('style.css'),
    new HTMLPlugin({
      template: './client/index.html'
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ]
};