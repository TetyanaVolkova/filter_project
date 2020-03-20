import crsApp from '../../../app';
import rightSidebarController from './rightSidebarController';

    describe( 'rightSidebarController', function() {

        let $scope, controller, $controller, $rootScope, MapFactory, $state;


        beforeEach(() => {
           angular.mock.module( crsApp );
        
            inject( function( _$controller_, _$rootScope_, _MapFactory_, _$state_ ) {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                MapFactory = _MapFactory_;
                $state = _$state_;
                $scope = $rootScope.$new();
                controller = $controller('RightSidebarController', { $scope: $scope });
            });
        });

        describe('rightSidebarController', function() {
            it('should exist', function() {
                expect(rightSidebarController).toBeDefined();
            });

            describe('ResetFavorite function', function() {

                it('resetFavorite function is working', function() {
                    $scope.$parent.favoriteCrs = ["one", "two", "three"];
                    $scope.resetFavorite();
                    expect($scope.$parent.favoriteCrs.length).toEqual(0);
                });
            });
           
        });
    });