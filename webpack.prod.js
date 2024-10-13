// webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true, // Minify JS
    splitChunks: {
      chunks: 'all', // Code-splitting
    },
  },
});
