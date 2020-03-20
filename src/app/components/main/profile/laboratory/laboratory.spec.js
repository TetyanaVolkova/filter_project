'use strict';

import crsApp from '../../../../app';

describe( 'LaboratoryController', function() {
  // Mock 'laboratories' angular module
  beforeEach( angular.mock.module( crsApp ));
  var mockScope = {};
  var controller;

  beforeEach(
    inject( function( $controller, $rootScope, $log, $animate, $timeout ) {
      mockScope = $rootScope.$new();
      this.$log = $log;
      this.$animate = $animate;
      this.$timeout = $timeout;
      controller = $controller( 'LaboratoryController', {
        $scope: mockScope,
        $log: $log,
        $animate: $animate,
        $timeout: $timeout
      });
    })
  );

  it( 'should check mapLab', function() {
    expect( mockScope.mapLab ).toBeDefined();
    expect( typeof mockScope.mapLab ).toEqual( 'object' );
    expect( typeof mockScope.mapLab.options ).toEqual( 'object' );
    expect( typeof mockScope.mapLab.events ).toEqual( 'object' );
    expect( mockScope.markerBase ).toBeUndefined();
    expect( mockScope.createMap ).toBeUndefined();
    expect( mockScope.centerPin ).toBeUndefined();
    expect( mockScope.$watch ).toBeDefined();
    expect( typeof mockScope.$watch ).toEqual( 'function' );
  });

  describe( 'Spying on LaboratoriesController', function() {
    it( 'should spy on zoom_changed', function() {
      var _spy_ = spyOn( mockScope.mapLab.events, 'zoom_changed' );
      mockScope.mapLab.events.zoom_changed();
      expect( _spy_ ).toHaveBeenCalled();
    });
  });

  describe( 'Spying on LaboratoriesController', function() {
    it( 'should spy on createMap', function() {
      expect( mockScope.createMap ).toBeUndefined();
    });
  });

  it( 'should check function', function() {
    function createMap( crs ) {
      var map = [];
      map = jasmine.createSpy().and.callFake( createMap );
      crs.laboratories.forEach( function( lab ) {
        map.push({});
      });
      return map;
    }

    expect( typeof createMap.map ).not.toEqual( 'object' );
  });

  describe( 'Spying on LaboratoryController', function() {
    it( 'should spy on $watch function', function() {
      var _spy_ = spyOn( mockScope, '$watch' );
      mockScope.$watch();
      expect( _spy_ ).toHaveBeenCalled();
      expect( mockScope.legends ).not.toBeDefined();
    });
  });

  describe( 'Watchers', function() {
    beforeEach( function() {
      mockScope.$digest();
    });

    it( 'should spy on $watch', function() {
      var _spy_ = spyOn( mockScope, '$digest' );
      mockScope.$digest();
      expect( _spy_ ).toHaveBeenCalled();
    });

    it( 'should spy on $watchCollection', function() {
      var _spy_ = spyOn( mockScope, '$watchCollection' );
      mockScope.$watchCollection();
      expect( _spy_ ).toHaveBeenCalled();
    });
  });

  describe( 'Initialization', function() {
    it( 'should instantiate $parent.$parent.loaded to its default', function() {
      expect( mockScope.markerLab ).not.toBeNull();
      expect( mockScope.markerProfile ).not.toBeNull();
      expect( mockScope.legends ).not.toBeDefined();
    });
  });
});
