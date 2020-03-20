'use strict';

import crsApp from '../../../app';

describe( 'Map', () => {
  beforeEach( angular.mock.module( crsApp ));

  describe( 'MapFactory', () => {
    let MapFactory;

    beforeEach(() => {
      inject( function( _MapFactory_ ) {
        MapFactory = _MapFactory_;
      });
    });

    it( 'should exist', () => {
      expect( MapFactory ).toBeDefined();
    });

    describe( 'getIconPath function', () => {
      it( 'should exist', () => {
        expect( MapFactory.getIconPath ).toBeDefined();
      });

      it( 'should run when invoked', function() {
        var spyGetIconPath = spyOn( MapFactory, 'getIconPath' );
        MapFactory.getIconPath();
        expect( spyGetIconPath ).toHaveBeenCalled();
      });

      it( 'should return a string', () => {
        expect( MapFactory.getIconPath()).toEqual( jasmine.any( String ));
      });

      it( 'should generate the correct image path for each icon type', () => {
        let iconTypes = {
          Red: './images/crspinred.png',
          Pink: './images/crspinpink.png',
          unselectedRed: './images/crspinred1.png',
          unselectedPink: './images/crspinpink1.png',
          profile: './images/crspinred.png',
          lab: './images/crspingreen.png'
        };

        for ( let type in iconTypes ) {
          let iconPath = MapFactory.getIconPath( type );
          expect( iconPath ).toEqual( iconTypes[type] );
        }
      });

      it( 'should not generate a path for invalid types', () => {
        let iconPath = MapFactory.getIconPath( 'magenta' );
        expect( iconPath ).toBeFalsy();
      });
    });

    describe( 'mapRefresh function', () => {
      it( 'should exist', () => {
        expect( MapFactory.mapRefresh ).toBeDefined();
      });

      it( 'should run when invoked', function() {
        var spyMapRefresh = spyOn( MapFactory, 'mapRefresh' );
        MapFactory.mapRefresh();
        expect( spyMapRefresh ).toHaveBeenCalled();
      });
    });

    describe( 'Google Map Zoom Levels', () => {
      it( 'should initialize the map zoom level', () => {
        expect( MapFactory.minZoomLvl ).toBe( 0 );
      });

      describe( 'autoZoom function', () => {
        it( 'should exist', () => {
          expect( MapFactory.autoZoom ).toBeDefined();
        });

        it( 'should run when invoked', function() {
          var spyAutoZoom = spyOn( MapFactory, 'autoZoom' );
          MapFactory.autoZoom();
          expect( spyAutoZoom ).toHaveBeenCalled();
        });
      });

      describe( 'minZoom function', () => {
        it( 'should exist', () => {
          expect( MapFactory.minZoom ).toBeDefined();
        });

        it( 'should run when invoked', function() {
          var spyMinZoom = spyOn( MapFactory, 'minZoom' );
          MapFactory.minZoom();
          expect( spyMinZoom ).toHaveBeenCalled();
        });
      });

      describe( 'maxZoom function', () => {
        it( 'should exist', () => {
          expect( MapFactory.maxZoom ).toBeDefined();
        });

        it( 'should run when invoked', function() {
          var spyMaxZoom = spyOn( MapFactory, 'maxZoom' );
          MapFactory.maxZoom();
          expect( spyMaxZoom ).toHaveBeenCalled();
        });
      });
    });
  });
});
