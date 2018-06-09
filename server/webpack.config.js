const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');

const DEV = process.env.NODE_ENV === 'development';
const PROD = process.env.NODE_ENV === 'production';

const baseDir = path.resolve(__dirname, './src');

let outputDir;

const plugins = [
  new Dotenv({
    path: './.env',
    safe: false
  })
];

if (PROD) {
  outputDir = path.resolve(__dirname, './build-prod');
} else if (DEV) {
  outputDir = path.resolve(__dirname, './dev_build');
} else {
  outputDir = path.resolve(__dirname, './build-qa');
}

if (!DEV) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    ie8: false,
    ecma: 7,
    output: {
      beautify: false,
      preserve_line: true,
      indent_level: 2
    }
  }));
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

const entry = `${baseDir}/index.js`;

const config = {
  target: 'node',
  node: {
    /* fixed a problem with resolving a proper __dirname */
    __dirname: false,
    __filename: false
  },
  entry: entry,
  output: {
    filename: 'server.js',
    path: outputDir
  },
  rules: [
    {
      test: /\.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }
  ],
  externals: [webpackNodeExternals()],
  devtool: DEV ? 'source-map' : false,
  resolve: {
    modules: [
      'node_modules'
    ]
  },
  plugins: plugins,
  watchOptions: {
    aggregateTimeout: 5000,
    ignored: /node_modules/,
    poll: false
  }
};

module.exports = merge(baseConfig, config);
