const isDevBuild = process.argv.indexOf('--env.prod') < 0;
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');

const allFilenamesExceptJavaScript = /\.(?!js(\?|$))([^.]+(\?|$))/;
const utils = require('./build/utils');

const projectRoot = path.resolve(__dirname, '../');

// Configuration in common to both client-side and server-side bundles
const sharedConfig = {
  resolve: {
    extensions: ['', '.js', '.ts', '.vue'],
    alias: {
      src: path.resolve(__dirname, '../ClientApp'),
      assets: path.resolve(__dirname, '../ClientApp/assets'),
      components: path.resolve(__dirname, '../ClientApp/components'),
      vue: 'vue/dist/vue.js',
    },
  },
  output: {
    filename: '[name].js',
    publicPath: '/dist/', // Webpack dev middleware, if enabled, handles requests for this URL prefix
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
    loaders: [
      //   {
      //     test: /\.js?$/,
      //     exclude: /(node_modules|bower_components)/,
      //     cacheable: true,
      //     loader: 'babel-loader',
      //     query: {
      //       stage: 0,
      //       //optional: ['runtime', 'es7.asyncFunctions'],
      //       retainLines: true,
      //       cacheDirectory: true
      //     }
      //   },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.html$/,
        loader: 'vue-html',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [new webpack.SourceMapDevToolPlugin()],
  devtool: '#eval-source-map',
};

// Configuration for client-side bundle suitable for running in browsers
const clientBundleConfig = merge(sharedConfig, {
  // entry: { 'main-client': './build/dev-client.js' },
  entry: {
    // The loader will follow all chains of reference from this entry point...
    main: ['./ClientApp/main.js'],
  },
  output: { path: path.join(__dirname, './wwwroot/dist') },
  devtool: isDevBuild ? '#eval-source-map' : '#eval-source-map',
  plugins: [
    // new webpack.DllReferencePlugin({
    //    context: __dirname,
    //    manifest: require('./wwwroot/dist/vendor-manifest.json')
    // })
    // Plugins that apply in production builds only
  ].concat(
    isDevBuild
      ? []
      : [new webpack.optimize.OccurenceOrderPlugin(), new webpack.optimize.UglifyJsPlugin()],
  ),
});

// Configuration for server-side (prerendering) bundle suitable for running in Node
const serverBundleConfig = merge(sharedConfig, {
  // entry: { 'main-server': './build/dev-server.js' },
  entry: {
    // The loader will follow all chains of reference from this entry point...
    main: ['./ClientApp/main.js'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, './wwwroot/dist'),
  },
  target: 'node',
  devtool: '#eval-source-map',
  externals: [nodeExternals({ whitelist: [allFilenamesExceptJavaScript] })],
});

module.exports = [clientBundleConfig, serverBundleConfig];
