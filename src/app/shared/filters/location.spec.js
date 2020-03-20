'use strict';

import crsApp from '../../app';

describe( 'location', function() {
  // Mock 'blacklist' angular module
  let locationFilter;

  beforeEach(() => {
    angular.mock.module( crsApp );
    inject( function( $filter ) {
      locationFilter = $filter( 'locationFilter', {});
    });
  });

  it( 'should exist', () => {
    expect( locationFilter ).toBeDefined();
  });
  let obj = {Europe: {Ukraine: ["zcity1", "acity2"], Switzerland: ["znumber1", "anumber2"]}, 
                    Africa: {Zambia: ["zcity1", "acity2"], Botswana: ["znumber1", "anumber2"]}};

  it( 'should filter continent', () => {
    expect( locationFilter(obj) ).toEqual(["Africa", "Europe"]);
  });

  it( 'should filter countries', () => {
    expect( locationFilter(obj, ["Africa"])).toEqual(["Botswana", "Zambia"]);
  });

  it( 'should filter countries', () => {
    expect( locationFilter(obj, ["Africa", "Europe"])).toEqual(["Botswana", "Switzerland", "Ukraine", "Zambia"]);
  });

  it( 'should filter states', () => {
    expect( locationFilter(obj, ["Africa"], ["Zambia"])).toEqual(["acity2", "zcity1"]);
  });

});