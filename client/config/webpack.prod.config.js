const path = require('path');
const webpack = require('webpack');
const ETPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const VENDOR_LIBS = [
  'react',
  'redux',
  'react-redux',
  'react-dom',
  'redux-form',
  'redux-thunk',
  'jquery'
];

module.exports = {
  entry: {
    main: path.join(__dirname, '../index.js'),
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
        test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg)/,
        use: 'url-loader?limit=8192'
      }
    ]
  },
  resolve: {
    extensions: [ '*', '.js', '.jsx' ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor', 'manifest' ]
    }),
    new ETPlugin({
      filename: 'style.css'
    }),
    new HTMLPlugin({
      template: './index.html'
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ]
};