// const path = require('path');
// const webpack = require('webpack');
// const ETPlugin = require('extract-text-webpack-plugin');
// const HTMLPlugin = require('html-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const VENDOR_LIBS = [
//   'react',
//   'redux',
//   'react-redux',
//   'react-dom',
//   'redux-form',
//   'redux-thunk',
//   'jquery'
// ];

// module.exports = {
//   entry: {
//     main: path.join(__dirname, '../index.js'),
//     vendor: VENDOR_LIBS
//   },
//   output: {
//     path: path.join(__dirname, '../dist'),
//     filename: '[name].[chunkhash].js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         options: {
//           presets: ['react', 'es2015', 'stage-1']
//         }
//       },
//       {
//         test: /\.scss$/,
//         use: ETPlugin.extract({
//           fallback: 'style-loader',
//           use: 'css-loader!sass-loader'
//         })
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg)/,
//         use: 'url-loader?limit=8192'
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['*', '.js', '.jsx']
//   },
//   devtool: 'source-map',
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify('production')
//       }
//     }),
//     new webpack.optimize.CommonsChunkPlugin({
//       names: ['vendor', 'manifest']
//     }),
//     new ETPlugin({
//       filename: 'style.css'
//     }),
//     new HTMLPlugin({
//       template: './index.html'
//     }),
//     new UglifyJSPlugin({
//       sourceMap: true
//     }),
//     new webpack.ProvidePlugin({
//       jQuery: 'jquery',
//       $: 'jquery',
//       jquery: 'jquery'
//     })
//   ]
// };


const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ETPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react',
  'redux',
  'react-redux',
  'react-dom',
  'redux-form',
  'redux-thunk',
  'jquery'
];

const plugins = [
  new HTMLPlugin({
    template: './index.html'
  }),
  new PurifyCSSPlugin({
    paths: glob.sync([
      path.join(__dirname, 'src/client/components/*.js'),
      path.join(__dirname, 'src/client/components/admin/*.js'),
      path.join(__dirname, 'src/client/components/auth/*.js'),
      path.join(__dirname, 'src/client/components/common_info/*.js'),
      path.join(__dirname, 'src/client/components/confirmation_of_assignment/*.js'),
      path.join(__dirname, 'src/client/components/edit_common_info/*.js'),
      path.join(__dirname, 'src/client/components/form_10/*.js'),
      path.join(__dirname, 'src/client/components/form_13/*.js'),
      path.join(__dirname, 'src/client/components/form_15/*.js'),
      path.join(__dirname, 'src/client/components/form_35_1/*.js'),
      path.join(__dirname, 'src/client/components/form_6b/*.js'),
      path.join(__dirname, 'src/client/components/form_8/*.js'),
      path.join(__dirname, 'src/client/components/initial_questions/*.js'),
      path.join(__dirname, 'src/client/components/landing/*.js'),
      path.join(__dirname, 'src/client/components/stripe/*.js')
    ]),
    minimize: true,
    verbose: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    ie8: false,
    ecma: 7,
    output: {
      beautify: false,
      preserve_line: true,
      indent_level: 2
    }
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new webpack.EnvironmentPlugin('NODE_ENV'),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'],
    minChunks: 2
  }),
  new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  }),
  new ETPlugin('styles.css'),
  new AssetsPlugin({
    includeManifest: 'manifest',
    prettyPrint: true,
    fullPath: false,
    path: path.resolve(__dirname, 'src')
  }),
  new MomentLocalesPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin()
];

const rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['react', 'es2015', 'stage-1']
    }
  },
  {
    test: /\.(scss|css)$/,
    use: ETPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader!sass-loader'
    })
  },
  {
    test: /\.(png|jpe?g|gif|woff|ttf|eot)/,
    loader: 'url-loader',
    options: {
      limit: 10240
    }
  },
  {
    test: /\.svg$/,
    loader: 'svg-url-loader',
    options: {
      limit: 10240,
      noquotes: true,
    }
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/,
    loader: 'image-webpack-loader',
    enforce: 'pre'
  }
];

const DEV = process.env.NODE_ENV === 'development';

const baseDir = path.resolve(__dirname, '../index.js');

const entry = `${baseDir}/client.js`;

module.exports = {
  mode: 'production',
  entry: {
    bundle: entry,
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      Bootstrap: path.resolve('node_modules/bootstrap-sass/assets'),
      jQuery: path.resolve('node_modules/jquery/dist')
    },
    extensions: ['*', '.js', '.json', '.jsx'],
    enforceExtension: false,
    modules: [
      'node_modules'
    ]
  },
  devtool: DEV ? 'cheap-module-source-map' : false,
  plugins: plugins,
  module: {
    rules: rules,
  },
  watchOptions: {
    aggregateTimeout: 5000,
    ignored: /node_modules/,
    poll: false
  }
};
