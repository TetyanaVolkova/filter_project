'use strict';

import crsApp from '../../app';
import footerController from './footerController';

    describe( 'footerController', function() {

        let $scope, FooterFactory, controller, $controller, $rootScope;


        beforeEach(() => {
           angular.mock.module( crsApp );
        
            inject( function(_FooterFactory_, _$controller_, _$rootScope_) {
                FooterFactory = _FooterFactory_;
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                $scope = $rootScope.$new();
                controller = $controller('FooterController', { $scope: $scope });
            });
        });

        describe('FooterController', function() {
            it('should exist', function() {
                expect(footerController).toBeDefined();
            });
        });
        describe( 'FooterFactory', () => {
            it( 'should exist', () => {
            expect( FooterFactory ).toBeDefined();
            });

            describe( 'getTime', () => {
            it( 'should exist', () => {
                expect( FooterFactory.getTime ).toBeDefined();
            });
            it( 'should be an object', () => {
                expect( typeof FooterFactory.getTime() ).toBe( 'object' );
            });
            });

            describe( 'getTime function', () => {

                let time = "2018-01-01 21:09:17";

                it( 'should exist', () => {
                    expect( FooterFactory.getTime ).toBeDefined();
                });

                it( 'should run when invoked', function() {
                    var getTimeSpy = spyOn( FooterFactory, 'getTime' );
                    FooterFactory.getTime();
                    expect( getTimeSpy ).toHaveBeenCalled();
                });

                it( 'should get time', inject(function ($httpBackend) {
                    $httpBackend.whenGET( './api/last_reviewed' ).respond(time);
                    $httpBackend.expectGET( './api/last_reviewed' )

                    FooterFactory.getTime().then( time => {
                        expect(time.data).toBe("2018-01-01 21:09:17");
                    });
                    $httpBackend.flush();
                }));

                it( 'should convert time', inject(function ($httpBackend) {
                    $httpBackend.whenGET( './api/last_reviewed' ).respond(time);
                    $httpBackend.expectGET( './api/last_reviewed' )

                    FooterFactory.getTime().then( time => {
                        expect($scope.updateTime).toBe("January 01, 2018");
                    });
                    $httpBackend.flush();
                }));
            });
        });
    });