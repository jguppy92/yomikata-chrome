const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    popup: './src/popup.js',
    contentScripts: './src/contentScripts.js',
    serviceWorker: './src/serviceWorker.js'
    // background: './src/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ['@babel/preset-env']
            }
        }
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    },
  ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/popup.html',
        filename: 'popup.html',
    }),
    new CopyPlugin({
        patterns: [
            { from: 'public' },
        ],
    }),
    ],
}
