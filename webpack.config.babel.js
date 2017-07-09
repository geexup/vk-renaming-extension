import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import path from 'path';

process.env.NODE_ENV = 'production';

const filename = '[name].js';
const libraryName = 'VkRnmExt';
const entry = {
  main: path.join(__dirname, 'src', 'main', 'app.js'),
  options: path.join(__dirname, 'src', 'options', 'options.js'),
  bg: path.join(__dirname, 'src', 'bg', 'bg.js')
};
const WebpackPath = path.join(__dirname, 'build','js');
const loaders = [];
const extensions = [];
const globalPlugins = [
  new CopyWebpackPlugin([
    { from: path.join(__dirname, 'static'), to: path.join(__dirname, 'build', 'static')},
    { from: path.join(__dirname, 'manifest.json'), to: path.join(__dirname, 'build')}
  ])
];
const devPlugins = [];
const prodPlugins = [];
const publicPath = path.dirname(WebpackPath).split('/').filter((elem, index, arr) => index === arr.length - 1)[0];

module.exports = function webpackES6Config(config = {}) {
  const plugins = [
    new CleanWebpackPlugin([ path.join(__dirname, 'build') ]),
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.DefinePlugin({
      '__DEV__': process.env.NODE_ENV === 'production' ? false : true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev')
      }
    }),
    ...globalPlugins
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }));
    devPlugins.forEach(function (p) { plugins.push(p); });
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
    devPlugins.forEach(function (p) { plugins.push(p); });
  }

  return {
    output: {
      path: WebpackPath,
      publicPath,
      filename,
      library: libraryName,
      libraryTarget: 'umd'
    },
    devServer: {
      hot: true,
      inline: true,
      colors: true,
      contentBase: './public/',
    },
    entry: entry,
    resolve: {
      extensions: ['.js', '.jsx', 'es6', ...extensions]
    },
    module: {
      loaders: [
        {
          test: /\.js|\.jsx|\.es6$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        ...loaders
      ]
    },
    plugins
  };
}
