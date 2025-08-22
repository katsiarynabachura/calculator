// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // Включает оптимизации, такие как минификация
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Очищать папку dist перед каждой сборкой
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Используем наш HTML как шаблон
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i, // Применять правило для всех файлов, заканчивающихся на .css
        use: ['style-loader', 'css-loader'], // Использовать эти два загрузчика (порядок важен!)
      },
    ],
  },
  devServer: {
    static: './dist',
  },
};