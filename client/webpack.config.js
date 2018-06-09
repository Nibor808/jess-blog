require('node-env-file')('./.env');
const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ETPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const HTMLPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const DEV = process.env.NODE_ENV === 'development';
const mode = DEV ? 'development' : 'production';
const outputDir = DEV ? path.resolve(__dirname) : path.resolve(__dirname, './build-prod');

const VENDOR_LIBS = [
  'react',
  'redux',
  'react-redux',
  'react-dom',
  'react-router-dom',
  'redux-form',
  'redux-thunk',
  'jquery'
];

const plugins = [
  new webpack.DefinePlugin({
    'SERVER_URL': DEV ? JSON.stringify(process.env.DEV_URL) : JSON.stringify(process.env.DEV_URL),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new webpack.EnvironmentPlugin('NODE_ENV'),
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
    path: path.resolve(__dirname)
  }),
  new MomentLocalesPlugin(),
  new HTMLPlugin({
    template: './index.html'
  })
];

const rules = [
  {
    test: /\.js?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      plugins: ['transform-class-properties'],
      presets: [
        'react',
        'stage-0',
        'es2015',
        'env',
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
  }
];

if (!DEV) {
  plugins.push(new PurifyCSSPlugin({
    paths: glob.sync([
      path.join(__dirname, './components/*.js'),
      path.join(__dirname, './components/*/*.js'),
    ]),
    minimize: true,
    verbose: true
  }));
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  rules.push(
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'image-webpack-loader',
      enforce: 'pre'
    }
  );
}

const config = {
  mode: mode,
  entry: {
    bundle: './index.js',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: outputDir,
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
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};

if (DEV) {
  config.devServer = {
    historyApiFallback: true,
    contentBase: './',
    stats: 'errors-only'
  }
}

module.exports = config;
