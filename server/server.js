const express = require( 'express' );
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const history = require( 'connect-history-api-fallback' );
// Initialize dotenv to set up access to environmental variables
const dotenv = require( 'dotenv' );
dotenv.config();

const routes = require( './routes' );

const app = express();

// Apply middleware
app.use( cors());
app.use( bodyParser.urlencoded({ extended: false }));
app.use( bodyParser.json());

app.use( '/', routes );
app.use( function( req, res, next ) {
  if ( req.url=='/404' ){ 
    res.status( 404 );
  } 
  next();
});
app.use( history());

// Use Webpack Dev/Hot Middleware if we are not in the production environment
if ( process.env.npm_lifecycle_event === 'start' ) {
  const webpack = require( 'webpack' );
  const webpackConfig = require( '../webpack/dev.config' );
  const compiler = webpack( webpackConfig );

  // Attach the dev middleware to the compiler & the server
  app.use(
    require( 'webpack-dev-middleware' )( compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );
  // Enable hot reloading
  app.use( require( 'webpack-hot-middleware' )( compiler ));
} else {
  // Make everything in the build directory available for use when in production
  app.use( express.static( path.join( __dirname, '../build' )));

  // Required for compatibility with AngularJS HTML5 mode
  app.get( '*', ( req, res ) => {
    res.sendFile( path.join( __dirname, '../build/index.html' ));
  });
}

const PORT = process.env.PORT || 3000;

app.listen( PORT, () => {
  console.log( `App listening on port ${PORT}!` );
});
