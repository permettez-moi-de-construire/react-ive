const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const babelRc = require('../.babelrc')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: babelRc
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@permettezmoideconstruire/react-ive': path.resolve(__dirname, '..', 'src/react-ive.js')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
}
