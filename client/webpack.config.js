module.exports = {
  entry: {
    core: './src/defaults/main.jsx'
  },
  output: {
    path: 'dist/core',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'jsx-loader?harmony'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  }
};