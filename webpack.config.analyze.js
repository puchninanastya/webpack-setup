const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const prodConfig = require('./webpack.config.prod.js');

module.exports = {
  ...prodConfig,
  plugins: [
    ...prodConfig.plugins,
    new BundleAnalyzerPlugin({
      analyzerPort: 3001,
      generateStatsFile: false,
    })
  ]
};
