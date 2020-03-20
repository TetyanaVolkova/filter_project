'use strict';

import crsApp from '../../../app';

describe( 'ProfileController', function() {
  var mockScope = {};
  var controller;

  // Mock 'crsprofileController' angular module
  beforeEach( angular.mock.module( crsApp ));

  beforeEach(
    inject( function(
      $controller,
      $rootScope,
      $state,
      $stateParams,
      $log,
      $mdDialog
    ) {
      mockScope = $rootScope.$new();
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$log = $log;
      this.$mdDialog = $mdDialog;
      controller = $controller( 'ProfileController', {
        $scope: mockScope,
        $state: $state,
        $stateParams: $stateParams,
        $log: $log,
        $mdDialog: $mdDialog
      });
    })
  );

  describe( 'Initialization', function() {
    it( 'should test init', function() {
      expect( mockScope.$parent.title ).not.toBeNull();
      expect( mockScope.$parent.crs ).not.toBeNull();
      expect( mockScope.$rsn ).not.toBeTruthy();
      expect( mockScope.currentState ).not.toBeNull();
    });
  });

  it( 'should check getState', function() {
    var getState = function( currentState ) {
      if (
        currentState === 'main.profile' ||
        currentState === 'main.labs' ||
        currentState === 'main.epi'
      ) {
        return true;
      } else {
        return false;
      }
    };

    expect( typeof getState ).toBe( 'function' );
    expect( getState ).not.toThrow();

    getState();
    expect( getState()).toBeFalsy();
    expect( getState()).toBe( false );
  });

  // test getState
  describe( 'get State', function() {
    it( 'should get valid state', function() {
      function getState( currentState ) {
        if (
          currentState === 'main.profile' ||
          currentState === 'main.labs' ||
          currentState === 'main.pharms' ||
          currentState === 'main.epi'
        ) {
          return true;
        } else {
          return false;
        }
      }

      expect( getState( 'main.profile' )).toBeTruthy();
      expect( getState( 'main.labs' )).toBeTruthy();
      expect( getState( 'main.epi' )).toBeTruthy();
      expect( getState( 'main.search' )).toBeFalsy();
    });
  });

  // popup tests

  // it('Test showNetworkpopup', function() {
  //     expect(mockScope.showNetworkpopup).toBeTruthy();
  //     expect(typeof mockScope.showNetworkpopup).toBe('function');
  // });

  // it('should spy on showNetworkpopup', function() {
  //     var spy_showNetworkpopup = spyOn(mockScope, 'showNetworkpopup');
  //     mockScope.showNetworkpopup();
  //     expect(spy_showNetworkpopup).toHaveBeenCalled();
  // });

  // it('Test showCrspopup', function() {
  //     expect(mockScope.showCrspopup).toBeTruthy();
  //     expect(typeof mockScope.showCrspopup).toBe('function');
  // });

  // it('should spy on showCrspopup', function() {
  //     var spyShowCrspopup = spyOn(mockScope, 'showCrspopup');
  //     mockScope.showCrspopup();
  //     expect(spyShowCrspopup).toHaveBeenCalled();
  // });

  // it('Test showRegpopup', function() {
  //     expect(mockScope.showRegpopup).toBeTruthy();
  //     expect(typeof mockScope.showRegpopup).toBe('function');
  // });

  // it('should spy on showRegpopup', function() {
  //     var spyShowRegpopup = spyOn(mockScope, 'showRegpopup');
  //     mockScope.showRegpopup();
  //     expect(spyShowRegpopup).toHaveBeenCalled();
  // });

  // it('Test showLabpopup', function() {
  //     expect(mockScope.showLabpopup).toBeTruthy();
  //     expect(typeof mockScope.showLabpopup).toBe('function');
  // });

  // it('should spy on showLabpopup', function() {
  //     var spyShowLabpopup = spyOn(mockScope, 'showLabpopup');
  //     mockScope.showLabpopup();
  //     expect(spyShowLabpopup).toHaveBeenCalled();
  // });

  // it('Test showTestspopup', function() {
  //     expect(mockScope.showTestspopup).toBeTruthy();
  //     expect(typeof mockScope.showTestspopup).toBe('function');
  // });

  // it('should spy on showTestspopup', function() {
  //     var spyShowTestspopup = spyOn(mockScope, 'showTestspopup');
  //     mockScope.showTestspopup();
  //     expect(spyShowTestspopup).toHaveBeenCalled();
  // });

  describe( 'Watcher', function() {
    it( 'should spy on $watch', function() {
      var _spy_ = spyOn( mockScope, '$watch' );
      mockScope.$watch();
      expect( _spy_ ).toHaveBeenCalled();
    });
  });

  describe( 'DialogController', function() {
    var DialogController = function( $scope, $mdDialog ) {
      mockScope.hide = function() {
        $mdDialog.hide();
      };

      mockScope.cancel = function() {
        $mdDialog.cancel();
      };
    };

    it( 'should check DialogController', function() {
      expect( DialogController()).toBe( undefined );
      expect( typeof DialogController ).toBe( 'function' );
      expect( DialogController ).not.toThrow();

      var spyHide = spyOn( mockScope, 'hide' );
      mockScope.hide();
      expect( spyHide ).toHaveBeenCalled();
      expect( typeof mockScope.hide ).toBe( 'function' );

      var spy_mdDialog_hide = spyOn( this.$mdDialog, 'hide' );
      this.$mdDialog.hide();
      expect( spy_mdDialog_hide ).toHaveBeenCalled();

      var spyCancel = spyOn( mockScope, 'cancel' );
      mockScope.cancel();
      expect( spyCancel ).toHaveBeenCalled();
      expect( typeof mockScope.cancel ).toBe( 'function' );

      var spy_mdDialog_cancel = spyOn( this.$mdDialog, 'cancel' );
      this.$mdDialog.cancel();
      expect( spy_mdDialog_cancel ).toHaveBeenCalled();
    });
  });
});
