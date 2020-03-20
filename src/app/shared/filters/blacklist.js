var blacklist = function() {
  return function( input ) {
    if ( !input.match( /[9]{3}/g )) {
      return input;
    } else {
      let pattern = new RegExp( '.*-\\s', 'i' );
      return input.replace( pattern, '' );
    }
  };
};

export default blacklist;
