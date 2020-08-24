const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { seo } = require('./package.json');

const TARGET_DIRNAME = 'dist';

module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.jsx')
  },
  output: {
    filename: 'js/[name]-bundle.js',
    path: path.resolve(__dirname, TARGET_DIRNAME),
  },
  devServer: {
    port: '3000',
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
    overlay: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.styl'],
    alias: {
      '@shared': path.resolve(__dirname, 'src', 'shared'),
      '@constants': path.resolve(__dirname, 'src', 'constants.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()]
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.(jp(e*)g|svg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ APP_ENV: JSON.stringify('dev') }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'templates', 'index.hbs'),
      favicon: path.resolve(__dirname, 'templates', 'favicon.png'),
      filename: 'index.html',
      inject: true,
      seo
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'pwa'),
        to: path.resolve(__dirname, TARGET_DIRNAME),
      }]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      options: {
        hmr: true,
        reloadAll: true
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};