'use strict';

const webpack = require( 'webpack' );
const autoprefixer = require( 'autoprefixer' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const FilterWarningsPlugin = require( 'webpack-filter-warnings-plugin' );

const path = require( 'path' );
const myEnv = require( 'dotenv' ).config();

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/app/app.ts', 'webpack-hot-middleware/client?reload=true']
  },
  output: {
    // Absolute output directory
    path: '/',

    publicPath: '/',

    // Filename for entry points
    filename: '[name].bundle.js',

    // Filename for non-entry points
    chunkFilename: '[name].bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
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
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
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
    new FilterWarningsPlugin({
      exclude: /System.import/
    }),
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
    // Render index.html
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    }),
    // Enable HMR

    new CopyWebpackPlugin( [
      {
        from: './src/public'
      }
    ] ),

    new ProgressBarPlugin(),
    // Only emit files when there are no errors

    new webpack.HotModuleReplacementPlugin(),
    // Copy assets from the public folder

    new webpack.NoEmitOnErrorsPlugin(),
    
    new webpack.ContextReplacementPlugin(
      // if you have anymore problems tweet me at @gdi2290
      // The (\\|\/) piece accounts for path separators for Windows and MacOS
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join( __dirname, 'src' ), // location of your src
      {} // a map of your routes 
    )
  ]
};
