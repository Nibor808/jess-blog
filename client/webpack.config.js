require('node-env-file')('./.env');
const webpack = require('webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const DEV = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: [
    './index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: ['transform-class-properties'],
          presets: [
            'react',
            'stage-0',
            ['env', {
              targets: {
                browsers: [
                  'Chrome >= 52',
                  'FireFox >= 44',
                  'Safari >= 7',
                  'Explorer 11',
                  'last 4 Edge versions'
                ]
              },
              useBuiltins: true
            }]
          ]
        }
      },
      {
        test: /\.scss$/,
        loaders: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg)/,
        loaders: 'file-loader?url-loader?limit=8192'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    enforceExtension: false,
    modules: [
      'node_modules'
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    stats: 'errors-only'
  },
  devtool: DEV ? 'cheap-module-source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'urls': {
        SERVER_URL: DEV ? JSON.stringify(process.env.DEV_URL) : ''
      },
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.EnvironmentPlugin('NODE_ENV'),
    new MomentLocalesPlugin()
  ]
};
