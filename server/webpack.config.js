const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

const DEV = process.env.NODE_ENV === 'development';
const PROD = process.env.NODE_ENV === 'production';
const mode = DEV ? 'development' : 'production';
const baseDir = path.resolve(__dirname);

let outputDir;

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new Dotenv({
    path: path.resolve(__dirname, '.env'),
    safe: false
  })
];

if (PROD) {
  outputDir = path.resolve(__dirname, './build-prod');

  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

const entry = `${baseDir}/server.js`;

const config = {
  mode: mode,
  target: 'node',
  entry: entry,
  output: {
    filename: 'server.js',
    path: outputDir
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env']
        }
      }
    ]
  },
  externals: [webpackNodeExternals()],
  devtool: DEV ? 'source-map' : false,
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  plugins: plugins
};

module.exports = config;
