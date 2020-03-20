import crsApp from '../../../app';
describe( 'LoadingDirective', function() {
    let $compile, $rootScope, $scope;

        beforeEach(() => {
           angular.mock.module( crsApp );
        
            inject( function( _$compile_, _$rootScope_ ) {
                $rootScope = _$rootScope_;
                $compile = _$compile_;
                $scope = $rootScope.$new();
            });
        });
  
    it( 'Replaces the element with the appropriate content', function() {
        let $element = angular.element( '<loading></loading>' );
        let $compiledElement = $compile( $element )( $scope );
        let loadingEl = $compiledElement[0].getElementsByClassName( 'load-text' )[0].innerHTML;
        $scope.$digest();
        expect( loadingEl ).toContain( "Loading..." );
    });
  });
