// modules
const { resolve } = require('path')

// plugins
// const webpack = require('webpack')
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'source/stylesheets'),
    pathinfo: true
  },
  resolve: {
    extensions: [
      '.js',
      '.sass',
      '.scss',
      '.css'
    ],
    modules: [
      resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(scss|sass|css)/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new OptimizeCSSAssetsPlugin(),
    // new CompressionPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(js|css|html|json|ico|svg|eot|otf|ttf)$/
    // })
  ],
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       extractComments: true,
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true,
  //       terserOptions: {
  //         // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
  //         compress: {
  //           drop_console: true,
  //         },
  //       }
  //     })
  //   ],
  // }
}
