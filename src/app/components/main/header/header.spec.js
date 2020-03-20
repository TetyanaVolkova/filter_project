import crsApp from '../../../app';
import headerController from './headerController';

    describe( 'HeaderController', function() {

        let $scope,controller, $controller, $rootScope, MapFactory, $state, $mdDialog, $q;
        let $mdDialogOpened = false;
        let $mdDialogHide = false;

        beforeEach(() => {
           angular.mock.module( crsApp );
        
            inject( function( _$controller_, _$rootScope_, _MapFactory_, _$state_, _$mdDialog_, _$q_) {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                MapFactory = _MapFactory_;
                $state = _$state_;
                $mdDialog = _$mdDialog_;
                $q = _$q_;
                $scope = $rootScope.$new();

                spyOn($mdDialog, 'show');

                controller = $controller('HeaderController', { $scope: $scope, $mdDialog: $mdDialog });
            });
        });

        describe('HeaderController', function() {
            it('should exist', function() {
                expect(headerController).toBeDefined();
            });

            describe( 'leftToggle function', function(){
    
                it('should collapse Left Nav', function(){
                    $scope.$parent.lockLeft = true;
                    $scope.leftToggle();
                    expect($scope.$parent.lockLeft).toBe(false);
                });
                it('should open Left Nav', function(){
                    $scope.$parent.lockLeft = false;
                    $scope.leftToggle();
                    expect($scope.$parent.lockLeft).toBe(true);
                });
            });

            describe( 'click_site function', function(){
    
                it('should collapse Right Nav', function(){
                    $scope.$parent.lockRight = false;
                    $scope.$parent.showFavorite = false;
                    $scope.click_site();
                    expect($scope.$parent.lockRight).toBe(true);
                });
                it('should open Right Nav', function(){
                    $scope.$parent.lockRight = true;
                    $scope.click_site();
                    expect($scope.$parent.lockRight).toBe(false);
                });
            });

            describe( 'click_favorite function', function(){
    
                it('should collapse Right Nav', function(){
                    $scope.$parent.showFavorite = true;
                    $scope.$parent.lockRight = true;
                    $scope.click_favorite();
                    expect($scope.$parent.lockRight).toBe(false);
                });
                it('should open Right Nav', function(){
                    $scope.$parent.lockRight = false;
                    $scope.click_favorite();
                    expect($scope.$parent.lockRight).toBe(true);
                });
            });

            describe( 'click_site function', function(){
    
                it('should collapse Right Nav', function(){
                    $scope.$parent.lockRight = false;
                    $scope.$parent.showFavorite = false;
                    $scope.click_site();
                    expect($scope.$parent.lockRight).toBe(true);
                });
                it('should open Right Nav', function(){
                    $scope.$parent.lockRight = true;
                    $scope.click_site();
                    expect($scope.$parent.lockRight).toBe(false);
                });
            });

            describe('Checking for watchers', function(){
    
                describe('$state event Listener', function() {
                    it('Watch $state to lock favorite in Viz', function(){
                        $state.current.name = 'main.viz';
                        $scope.$digest();
                        expect($scope.lockFav).toBe(true);
                    });
                    it('Watch $state to unlock favorite in Viz', function(){
                        $state.current.name = 'main.home';
                        $scope.$digest();
                        expect($scope.lockFav).toBe(false);
                    });
                });
    
                describe('showFavorite event Listener', function() {
                    it('Watch favorites to lock Viz', function(){
                        $scope.$parent.showFavorite  = true;
                        $scope.$digest();
                        expect($scope.lockViz).toBe(true);
                    });
                    it('Watch favorites to unlock Viz', function(){
                        $scope.$parent.showFavorite  = false;
                        $scope.$digest();
                        expect($scope.lockViz).toBe(false);
                    });
                });

            });

            describe( 'Function to show confirm dialog', function(){
    
                it('should show / open $mdDialog dialog', function(){
                    $scope.$parent.lockRight = true;
                    $scope.$parent.showFavorite = true;
                    $scope.$parent.favoriteCrs = [];
                    $scope.showConfirm();
                    $scope.$digest();
                    expect($mdDialog.show).toHaveBeenCalled();
                    expect($mdDialogOpened).toBe.true;
                });
    
                it('should hide / close mdDialog dialog', function(){
                    $scope.$parent.crss = [];
                    spyOn($mdDialog, 'hide');
                    let deferred = $q.defer();
                    $scope.showConfirm();
                    $mdDialog.hide();
                    $scope.$digest();
                    deferred.resolve();
                    $rootScope.$apply();
                    expect($mdDialog.hide).toHaveBeenCalled();
                    expect($mdDialogHide).toBe.true;
                });
            });
    
            describe('getFileSize function', function() {
                it('Sould correctly calculate favorites file size', function(){
                    $scope.$parent.lockRight = true;
                    $scope.$parent.showFavorite = true;
                    $scope.$parent.favoriteCrs = [1, 2, 3, 4, 5, 6, 7];
                    $scope.$digest();
                    expect($scope.getFileSize()).toBe('7.8 KB');
                });
                it('Sould correctly calculate crss file size', function(){
                    $scope.$parent.lockRight = true;
                    $scope.$parent.showFavorite = false;
                    $scope.$parent.crss = [1];
                    $scope.$digest();
                    expect($scope.getFileSize()).toBe('4.4 KB');
                });
                it('Sould correctly calculate crss file size', function(){
                    $scope.$parent.lockRight = true;
                    $scope.$parent.showFavorite = false;
                    $scope.$parent.crss = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
                    $scope.$digest();
                    expect($scope.getFileSize()).toBe('19.2 KB');
                });
            });
           
        });
    });