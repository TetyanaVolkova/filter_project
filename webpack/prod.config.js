'use strict';

const webpack = require( 'webpack' );
const autoprefixer = require( 'autoprefixer' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const path = require( 'path' );
const myEnv = require( 'dotenv' ).config();

const VENDOR_LIBS = [
  "connect-history-api-fallback",
  "cors",
  "countup.js",
  "d3",
  "dotenv",
  "file-saver",
  "moment",
  "path",
  "recursive-readdir-sync"
]

module.exports = {
  mode: "production",
  entry: {
    app: './src/app/app.ts',
    vendor: VENDOR_LIBS
  },
  output: {
    // Absolute output directory
    path: path.join( __dirname, '../build' ),

    // Output path from the view of the page
    publicPath: '/',

    // Filename for entry points
    // Add hash in production
    filename: '[name].[chunkhash].js',

    // Filename for non-entry points
    // Add hash in production
    chunkFilename: '[name].[chunkhash].js'
  },
  node: {
    fs: "empty"
  },
  resolve: {
      // Add '.ts' and '.tsx' as a resolvable extension.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // {
      //   // ESLINT LOADER
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: '/node_modules/'
      // },
      {
        // JS LOADER
        test: /\.js$/,
        use: 'babel-loader',
        exclude: path.join( __dirname, '../node_modules/' )
      },
      {
        // CSS LOADER
        test: /\.scss$/,
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files in production builds
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        }),
        exclude: path.join( __dirname, '../node_modules/' )
      },
      { 
        // TS LOADER
        test: /\.tsx?$/, 
        use: "ts-loader",
        exclude: /node_modules/
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
    new webpack.ContextReplacementPlugin(
      // if you have anymore problems tweet me at @gdi2290
      // The (\\|\/) piece accounts for path separators for Windows and MacOS
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join( __dirname, 'src' ), // location of your src
      {} // a map of your routes 
    ),
    new CleanWebpackPlugin( ['build'], { root: path.join( __dirname, '../' ) }),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.MAP_API_KEY': JSON.stringify( process.env.MAP_API_KEY ),
    }),
    // Extract css files
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
      allChunks: true
    }),
    // Copy assets from the public folder
    new CopyWebpackPlugin( [
      {
        from: './src/public'
      }
    ] ),
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor', 'manifest']
    // }),
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
    }),
    new ProgressBarPlugin(),
    // Only emit files when there are no errors
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
