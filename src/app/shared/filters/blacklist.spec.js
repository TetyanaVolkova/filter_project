'use strict';

import crsApp from '../../app';

describe( 'blacklist', function() {
  // Mock 'blacklist' angular module
  let blacklist;

  beforeEach(() => {
    angular.mock.module( crsApp );
    inject( function( $filter ) {
      blacklist = $filter( 'blacklist', {});
    });
  });

  it( 'should exist', () => {
    expect( blacklist ).toBeDefined();
  });

  it( 'should filter CRS names that match the blacklisted pattern', () => {
    let unfiltered = '999 - Test';
    expect( blacklist( unfiltered )).not.toEqual( unfiltered );
    expect( blacklist( unfiltered )).toEqual( 'Test' );
  });

  it( 'should not filter CRS names that do not match the blacklisted pattern', () => {
    let unfiltered = '998 - Test';
    expect( blacklist( unfiltered )).toEqual( unfiltered );
  });
});
