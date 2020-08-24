const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const { seo } = require('./package.json');

const TARGET_DIRNAME = 'dist';

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.jsx')
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, TARGET_DIRNAME),
    publicPath: '/'
  },
  devtool: false,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.styl'],
    alias: {
      '@shared': path.resolve(__dirname, 'src', 'shared'),
      '@constants': path.resolve(__dirname, 'src', 'constants.js'),
    }
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minChunks: 2
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:5]'
              }
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
    new webpack.DefinePlugin({ APP_ENV: JSON.stringify(process.env.APP_ENV) }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'templates', 'index.hbs'),
      favicon: path.resolve(__dirname, 'templates', 'favicon.png'),
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true
      },
      seo
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'pwa'),
        to: path.resolve(__dirname, TARGET_DIRNAME)
      },]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        zindex: false
      },
      canPrint: true
    }),
    new UnusedFilesWebpackPlugin({ patterns: "src/**/*.*" }),
    new DuplicatePackageCheckerPlugin()
  ]
};