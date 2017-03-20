const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, 'server.js'),

  output: {
    filename: 'server.bundle.js'
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
      }
    ]
  },
  target: 'node',
  externals: [ nodeExternals() ]
}