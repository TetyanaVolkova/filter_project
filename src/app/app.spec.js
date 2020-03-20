'use strict';

import crsApp from './app';

describe( 'Application Route', function() {
  var $state,
    mockScope,
    httpBackendMock,
    stateLanding = 'landing',
    stateMain = 'main.home';

  beforeEach( angular.mock.module( crsApp ));

  beforeEach(
    inject( function(
      _$state_,
      $templateCache,
      $rootScope,
      $httpBackend,
      $controller
    ) {
      mockScope = $rootScope.$new();
      $state = _$state_;
      $state.transitionTo( 'landing.disclaimer' );
      $controller( 'LandingNavController', {
        $scope: mockScope,
        $state: $state
      });
      httpBackendMock = $httpBackend;
      $templateCache.put( '../components/main/main.html' );
      $templateCache.put( '../components/landing/landing.html' );
    })
  );

  // afterEach( function() {
  //   try {
  //     httpBackendMock.verifyNoOutstandingRequest();
  //     console.log( 'No out standing Request' );
  //   } catch ( e ) {
  //     httpBackendMock.verifyNoOutstandingExpectation();
  //     console.log( 'No out standing Expectation' );
  //   } finally {
  //     console.log( 'Hello APP!!!' );
  //   }
  // });

  it( 'should respond to URL', function() {
    expect( $state.href( stateLanding )).toEqual( '/' );
    expect( $state.href( stateMain )).toEqual( '/map' );
  });
});
