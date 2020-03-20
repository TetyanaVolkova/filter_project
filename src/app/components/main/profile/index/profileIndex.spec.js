import crsApp from '../../../../app';
import profileIndexController from './profileIndexController';

    describe( 'profileIndexController', function() {

        let $scope, controller, $controller, $rootScope, $parentScope, MapFactory, $state;


        beforeEach(() => {
           angular.mock.module( crsApp );
        
            inject( function( _$controller_, _$rootScope_, _MapFactory_, _$state_ ) {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                MapFactory = _MapFactory_;
                $state = _$state_;
                $scope = $rootScope.$new();
                $parentScope = $rootScope.$new();
                $scope.$parent = $parentScope;
                controller = $controller('ProfileIndexController', { $scope: $scope });
            });
        });

        describe('profileIndexController', function() {
            it('should exist', function() {
                expect(profileIndexController).toBeDefined();
            });

            describe('semicolonSplit function', function() {

                it('semicolonSplit function splitting by semicolon', function() {
                    var name = $scope.semicolonSplit("word1;word2");
                    expect(name).toEqual(["word1", "word2"]);
                });
            });
           
        });
    });