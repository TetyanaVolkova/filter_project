import crsApp from '../../../app';
import leftSidebarController from './leftSidebarController';

    describe( 'LeftSidebarController', function() {

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
                controller = $controller('LeftSidebarController', { $scope: $scope });
            });
        });
        

        describe('LeftSidebarController', function() {
            it('should exist', function() {
                expect(leftSidebarController).toBeDefined();
            });

            describe('Collapse function', function() {

                it('collapse function extends options', function() {
                    $scope.previous = {};
                    $scope.collapse();
                    expect($scope.previous).toEqual(this.ft);
                });

                it('collapse function collapses options', function() {
                    $scope.previous = this.ft;
                    $scope.collapse();
                    expect($scope.previous).toEqual(null);
                });
            });

            describe('reset function', function() {
                it('Should reset object data', function() {
                    $scope.filter = {crs: {crs: ["name"]}, location: {loc: "loc"}, epidemiology: {epi: "epi"}, network: {net: "net"}, unfundednetwork: {status: ["status"]}, pis: {PI: ["pis"]}};
                    expect($scope.filter.crs.crs).toEqual(["name"]);
                    expect($scope.filter.location.loc).toEqual("loc");
                    $scope.reset(); 
                    expect($scope.filter.crs.crs).toEqual([]);
                    expect($scope.filter.location.loc).toEqual([]);
                    expect($scope.previous).toEqual(null);
                });
            });

            describe('locationVisibility function', function() {
                it('Should return true or false', function() {
                    let obj = [];
                    expect($scope.locationVisibility(obj)).toEqual(false);
                    obj = ["Africa"];
                    expect($scope.locationVisibility(obj)).toEqual(true);
                });
            });

            describe('toggleFilterValue function', function() {
                it('Should toggle filter value', function() {
                    $scope.filter = {unfundednetwork: {status: ["NIAID Reserve CRSs"]}};
                    $scope.toggleFilterValue('unfundednetwork', 'status', 'NIAID Reserve CRSs');
                    expect($scope.filter.unfundednetwork.status).toEqual([]);
                    $scope.toggleFilterValue('unfundednetwork', 'status', 'NIAID Reserve CRSs');
                    expect($scope.filter.unfundednetwork.status).toEqual(['NIAID Reserve CRSs']);
                    $scope.filter = {unfundednetwork: {status: ["Something else", "NIAID Reserve CRSs"]}};
                    $scope.toggleFilterValue('unfundednetwork', 'status', 'NIAID Reserve CRSs');
                    expect($scope.filter.unfundednetwork.status).toEqual(['Something else']);
                    $scope.filter = {unfundednetwork: {}};
                    $scope.toggleFilterValue('unfundednetwork', 'status', 'NIAID Reserve CRSs');
                    expect($scope.filter.unfundednetwork.status).toEqual(['NIAID Reserve CRSs']);
                });
            });

            describe('querySearch function', function() {
                it('Should find the right items in the object and sort them', function() {
                    let PINames = {PI: ["Test, test", "one more test", "rr, test", "find rrrrr"]};
                    expect($scope.querySearch('rr', PINames)).toEqual(["rr, test", "find rrrrr"]);
                    expect($scope.querySearch('ttt', PINames)).toEqual([]);
                    PINames = {PI: ["Test, test", "one more test", "rr, test", "find rrrrr", "arr should be second"]};
                    expect($scope.querySearch('rr', PINames)).toEqual(["rr, test", "arr should be second", "find rrrrr"]);
                    PINames = {};
                    expect($scope.querySearch('r', PINames)).toEqual([]);
                });
            });

            describe('Left Nav add chips', function() {
                it('Should add chips after filtering', function() {
                    $scope.$parent.filter = {};
                    $scope.$apply();
                    expect($scope.chips).toEqual([]);
                    $scope.$parent.filter = {crs: {}, location: {}, epidemiology: {}, network: {}, unfundednetwork: {}, pis: {PI: ["pis"]}};
                    $scope.$apply();
                    expect($scope.chips).toEqual([{ catagory: 'pis', subcat: 'PI', name: 'pis' }]);
                    $scope.$parent.filter.unfundednetwork = {status: ["some status"]};
                    $scope.$apply();
                    expect($scope.chips).toEqual([{catagory: 'unfundednetwork', subcat: 'status', name: 'some status'}, {catagory: 'pis', subcat: 'PI', name: 'pis'}]);
                });
            });

        });
    });