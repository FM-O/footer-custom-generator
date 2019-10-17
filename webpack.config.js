const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// CONFIG
const PLUGINS = [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
    })
];


module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/app.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'js/app.js'
  },
  devtool: 'source-map',
  module: {
    // apply rules to files that meet given conditions
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '/client/modules'),
        use: {
            'loader': 'babel-loader',
            'query': {
                presets: ["es2015"]
            }
        }
    },
    {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'sass-loader']
    }]
  },
  plugins: PLUGINS,

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
