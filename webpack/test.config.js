'use strict';

const webpack = require( 'webpack' );
const autoprefixer = require( 'autoprefixer' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const path = require( 'path' );

module.exports = {
  entry: void 0,

  output: {},
  devtool: 'inline-source-map',
  module: {
    rules: [
      // {
      //   // ESLINT LOADER
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: '/node_modules/'
      // },
      // ISTANBUL LOADER
      // Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
      // Skips node_modules and files that end with .spec.js
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /\.spec\.js$/],
        loader: 'istanbul-instrumenter-loader',
        query: {
          esModules: true
        }
      },
      {
        // JS LOADER
        test: /\.js$/,
        use: 'babel-loader',
        exclude: path.join( __dirname, '../node_modules/' )
      },
      {
        // CSS LOADER
        test: /\.scss$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
        exclude: path.join( __dirname, '../node_modules/' )
      },
      // FONT LOADER
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        // ASSET LOADER
        test: /\.(png|jpg|jpeg|gif|svg|ttf|eot)$/,
        use: 'file-loader',
        exclude: path.join( __dirname, '../node_modules/font-awesome/' )
      },
      {
        // RAW LOADER
        // Allow loading html and txt files through js
        test: /\.(html|txt)$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    }),
    new ProgressBarPlugin()
  ]
};
