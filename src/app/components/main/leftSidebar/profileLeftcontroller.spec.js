import crsApp from '../../../app';
import ProfileLeftController from './profileLeftController';

    describe( 'ProfileLeftController', function() {

        let $scope, controller, $controller, $rootScope, MapFactory, $state, $compile;


        beforeEach(() => {
           angular.mock.module( crsApp );
        
            inject( function( _$controller_, _$rootScope_, _MapFactory_, _$state_, _$compile_) {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                MapFactory = _MapFactory_;
                $state = _$state_;
                $compile = _$compile_;
                $scope = $rootScope.$new();
                controller = $controller('ProfileLeftController', { $scope: $scope });
            });
        });
        

        describe('ProfileLeftController', function() {
            it('should exist', function() {
                expect(ProfileLeftController).toBeDefined();
            });

            describe('goToView function', function() {
                let view, $element, button;
                it('Navigates to Laboratory view', function() {
                    view = "labs";
                    $element = angular.element(`<md-button ng-click = 'goToView({crs_name: "Massachusetts General Hospital CRS (MGH CRS)"}, "${view}")'></md-button>`);
                    button = $compile($element)($scope)[0];
                    button.click();
                    expect($state.$current.name).toEqual("main.labs");
                });

                it('Navigates to Profile view', function() {
                    view = "pharms";
                    $element = angular.element(`<md-button ng-click = 'goToView({crs_name: "Massachusetts General Hospital CRS (MGH CRS)"}, "${view}")'></md-button>`);
                    button = $compile($element)($scope)[0];
                    button.click();
                    expect($state.$current.name).toEqual("main.pharms");
                });

                it('Navigates to Profile view', function() {
                    view = "epi";
                    $element = angular.element(`<md-button ng-click = 'goToView({crs_name: "Massachusetts General Hospital CRS (MGH CRS)"}, "${view}")'></md-button>`);
                    button = $compile($element)($scope)[0];
                    button.click();
                    expect($state.$current.name).toEqual("main.epi");
                });

                it('Navigates to Profile view', function() {
                    view = "pharms";
                    $element = angular.element(`<md-button ng-click = 'goToView({crs_name: "Massachusetts General Hospital CRS (MGH CRS)"}, "${view}")'></md-button>`);
                    button = $compile($element)($scope)[0];
                    button.click();
                    expect($state.$current.name).toEqual("main.pharms");
                });

            });
           
        });
    });