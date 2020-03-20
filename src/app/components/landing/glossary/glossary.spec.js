import crsApp from '../../../app';
import GlossaryController from './glossaryController';

    describe( 'GlossaryController', function() {

        let $scope,controller, $controller, $rootScope;


        beforeEach(() => {
           angular.mock.module( crsApp );
        
            inject( function( _$controller_, _$rootScope_) {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                $scope = $rootScope.$new();
                controller = $controller('GlossaryController', { $scope: $scope });
            });
        });

        describe('GlossaryController', function() {
            it('GlossaryController should exist', function() {
                expect(GlossaryController).toBeDefined();
            });
           
        });

        describe('gotoAnchor function', function() {
          it('gotoAnchor function should exist', function() {
            expect($scope.gotoAnchor ).toBeDefined();
          });
          describe('$scope.anchors ', function() {
            it('should exist', function() {
              expect( $scope.anchors ).toBeDefined();
            });
        
            it('should return an array from "A" to "Z"', function() {
              let expectResult = [];
              let start = 'A', stop = 'Z';
              for (let idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
                expectResult.push(String.fromCharCode(idx));
              }
              expect( $scope.anchors ).toEqual(expectResult);
            });

          });
        });
    });