import crsApp from '../../app';
import { doesNotThrow } from 'assert';
import { callbackify } from 'util';
describe('linkDirective', function() {
    let $compile, $rootScope, $scope, $mdDialog, $q;

        beforeEach(() => {
           angular.mock.module( crsApp );
        
            inject( function(_$compile_, _$rootScope_, _$mdDialog_, _$q_) {
                $rootScope = _$rootScope_;
                $compile = _$compile_;
                $mdDialog = _$mdDialog_;
                $q = _$q_;
                $scope = $rootScope.$new();
            });
        });

        describe("About Page links", function(){
  
            it('Sould show the dialogs for About Page links', function() {
                spyOn($mdDialog, "show").and.callFake(function(params) {
                    let dialogElement = document.getElementsByTagName('h2')[0];
                    expect(params.template).toContain("You are about to leave the CRS Explorer");
                });
                let $element = angular.element(`<link-directive directiveid="actg" type='leaving'></link-directive>`);
                let $compiledElement = $compile($element)($scope);
                $scope.$digest();
                let linkElement = $compiledElement[0].getElementsByTagName('a')[0];
                linkElement.click();
                expect($mdDialog.show).toHaveBeenCalled();
            });
        });

        describe("Profile views dialogs", function(){
            it('Sould show the correct dialogs for profile information', function() {
                const params = ['profile1,CRSinformation,Clinical Research Site (CRS)', 'profile2,Crsrequirements,Regulatory Information', 'lab1,labInformation,Laboratory Infrastructure', 'lab2,testPerformed,Tests Performed', 'phar1,PharInformation,Pharmacy Information', 'phar2,pharmCapability,Pharmacy Capability'];
                    spyOn($mdDialog, "show").and.callFake(function(params) {
                        let dialogElement = document.getElementsByTagName('h2')[0];
                        expect(params.template).toContain("Clinical Research Site (CRS)");
                    });
                    let $element = angular.element(`<link-directive directiveid="CRSinformation"} type="profile1"}></link-directive>`);
                    let $compiledElement = $compile($element)($scope);
                    let linkElement = $compiledElement[0].getElementsByTagName('a')[0];
                    linkElement.click();
                    expect($mdDialog.show).toHaveBeenCalled();
            });
            it('Sould show the correct dialogs for profile Regulatory', function() {
                const params = ['profile1,CRSinformation,Clinical Research Site (CRS)', 'profile2,Crsrequirements,Regulatory Information', 'lab1,labInformation,Laboratory Infrastructure', 'lab2,testPerformed,Tests Performed', 'phar1,PharInformation,Pharmacy Information', 'phar2,pharmCapability,Pharmacy Capability'];
                    spyOn($mdDialog, "show").and.callFake(function(params) {
                        let dialogElement = document.getElementsByTagName('h2')[0];
                        expect(params.template).toContain("Regulatory Information");
                    });
                    let $element = angular.element(`<link-directive directiveid="Crsrequirements"} type="profile2"}></link-directive>`);
                    let $compiledElement = $compile($element)($scope);
                    let linkElement = $compiledElement[0].getElementsByTagName('a')[0];
                    linkElement.click();
            });
            it('Sould show the correct dialogs for Pharmacy Capability', function() {
                const params = ['profile1,CRSinformation,Clinical Research Site (CRS)', 'profile2,Crsrequirements,Regulatory Information', 'lab1,labInformation,Laboratory Infrastructure', 'lab2,testPerformed,Tests Performed', 'phar1,PharInformation,Pharmacy Information'];
                    spyOn($mdDialog, "show").and.callFake(function(params) {
                        let dialogElement = document.getElementsByTagName('h2')[0];
                        expect(params.template).toContain("Pharmacy Capability");
                    });
                    let $element = angular.element(`<link-directive directiveid="pharmCapability" type="phar2"}></link-directive>`);
                    let $compiledElement = $compile($element)($scope);
                    let linkElement = $compiledElement[0].getElementsByTagName('a')[0];
                    linkElement.click();
            });
        });
  });