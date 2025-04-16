// webpack.config.js

const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин для работы с HTML
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключаем плагин для очистки папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключаем плагин для работы с CSS

module.exports = {
  entry: { main: './src/index.js' }, // точка входа, откуда начинается сборка
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },

  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }, // указываем, что нужно обрабатывать @import
          },
          'postcss-loader', // подключаем PostCSS
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // путь к файлу index.html
      // inject: 'body', // <--- скрипт будет вставлен перед </body>
    }),
    new CleanWebpackPlugin(), // очищает папку dist перед каждой сборкой
    new MiniCssExtractPlugin(), // извлекает CSS в отдельный файл
  ],
};
