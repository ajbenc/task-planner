const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,  // This regex looks for .css files
        use: ['style-loader', 'css-loader'],  // Use these loaders for CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',  // Your HTML template file
      filename: 'index.html',
    }),
  ],
  mode: 'production',  // Or set it to 'development'
};
