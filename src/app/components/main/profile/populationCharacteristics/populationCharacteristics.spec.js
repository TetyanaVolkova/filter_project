'use strict';

import crsApp from '../../../../app';

describe( 'PopulationCharacteristicsController', function() {
  // Mock 'epidemiology' angular module
  beforeEach( angular.mock.module( crsApp ));
  var mockScope = {};
  var controller;

  beforeEach(
    inject( function( $controller, $rootScope, $log ) {
      mockScope = $rootScope.$new();
      this.$log = $log;
      controller = $controller( 'PopulationCharacteristicsController', {
        $scope: mockScope,
        $log: $log
      });
    })
  );

  it( 'should check the list', function() {
    expect( typeof mockScope.Gender ).toBeDefined();
    expect( mockScope.Gender ).toEqual( ['Female', 'Male', 'Transgender'] );

    expect( typeof mockScope.Age ).toBeDefined();
    expect( mockScope.Age ).toEqual( [
      'Infant',
      'Children',
      'Adolescents (13-17)',
      'Young Adult (18-24)',
      'Adult'
    ] );

    expect( typeof mockScope.Race_Ethnicity ).toBeDefined();
    expect( mockScope.Race ).toEqual(
      [
        'Black or African American',
        'White',
        'Asian',
        'American Indian or Alaska Native',
        'Native Hawaiian or Other Pacific Islander',
        'Other'
      ].sort()
    );

    expect( typeof mockScope.Risk_Factor ).toBeDefined();
    expect( mockScope.Risk_Factor ).toEqual( [
      'MTCT',
      'MSM',
      'Bisexual',
      'Heterosexual',
      'Sex Work',
      'Transactional Sex',
      'People Who Inject Drugs',
      'Sero-Discordant Couple',
      'Breastfeeding/Lactating',
      'Substance Abuse'
    ] );

    expect( typeof mockScope.Disease_Condition ).toBeDefined();
    expect( mockScope.Disease_Condition ).toEqual( [
      'Pregnant',
      'Post Menopausal',
      'HIV Exposed',
      'HIV Uninfected',
      'Clade A',
      'Clade B',
      'Clade C',
      'Clade D',
      'Clade E',
      'HIV Infected',
      'Acute HIV Infection',
      'Chronic HIV Infection',
      'Treatment Naive',
      'Infectious Comorbidities',
      'Non-Infectious Comorbidities',
      'Malignancies'
    ] );

    expect( typeof mockScope.Condition_Cont ).toBeDefined();
    expect( mockScope.Condition_Cont ).toEqual( [
      'TB',
      'MDR TB',
      'XDR TB',
      'TB Coinfection With HIV',
      'Hepatitis B',
      'Hepatitis B Coinfection With HIV',
      'Hepatitis C',
      'Hepatitis C Coinfection With HIV'
    ] );

    expect( typeof mockScope.Disease_Cont_Condition ).toBeDefined();
    expect( mockScope.Disease_Cont_Condition ).toEqual( [
      'HIV Uninfected',
      'HIV Exposed Infants',
      'HIV Infected',
      'Clade A',
      'Clade B',
      'Clade C',
      'Clade D',
      'Clade E',
      'Acute HIV Infection',
      'Chronic HIV Infection',
      'Treatment Naive',
      'HIV Related Malignancies',
      'HIV/TB Co-infection',
      'TB',
      'MDR TB',
      'XDR TB',
      'HIV/HBV Co-infection',
      'HBV',
      'HIV/HCV Co-infection',
      'HCV',
      'Infectious Comorbidities',
      'Non-Infectious Comorbidities',
      'Pregnant',
      'Post Menopausal'
    ] );

    expect( mockScope.selected ).toEqual( [] );

    expect( typeof mockScope.toggle ).toEqual( 'function' );

    expect( typeof mockScope.exists ).toEqual( 'function' );

    expect( typeof mockScope.checkItem ).toEqual( 'function' );

    expect( typeof mockScope.$watch ).toEqual( 'function' );
  });

  describe( 'Spying on EpidemiologyController', function() {
    it( 'should spy on toggle', function() {
      var spy = spyOn( mockScope, 'toggle' );
      mockScope.toggle();
      expect( spy ).toHaveBeenCalled();
      expect( mockScope.idx ).toEqual( undefined );
    });

    it( 'should spy on exists', function() {
      var spy = spyOn( mockScope, 'exists' );
      mockScope.exists();
      expect( spy ).toHaveBeenCalled();
    });

    it( 'should spy on exists', function() {
      var spy = spyOn( mockScope, 'exists' ).and.returnValue( 1 );
      expect( mockScope.exists()).toEqual( 1 );
    });

    it( 'should spy on checkItem', function() {
      var spy = spyOn( mockScope, 'checkItem' );
      mockScope.checkItem();
      expect( spy ).toHaveBeenCalled();
    });

    it( 'should spy on exists', function() {
      var spy = spyOn( mockScope, 'checkItem' ).and.returnValue( -1 );
      expect( mockScope.checkItem()).toEqual( -1 );
    });

    it( 'should spy on $watch()', function() {
      var spy = spyOn( mockScope, '$watch' );
      mockScope.$watch();
      expect( spy ).toHaveBeenCalled();
    });
  });

  it( 'should check getPopulation', function() {
    var getPopulation = function( crs ) {
      var population = crs.crspopulations;
    };

    expect( typeof getPopulation ).toEqual( 'function' );
    expect( mockScope.crsAge ).toEqual( undefined );
    expect( mockScope.crsRace_Ethnicity ).not.toBeDefined();
    expect( mockScope.crsRisk_Factor ).not.toBeDefined();
    expect( mockScope.crsDisease_Condition ).not.toBeDefined();
  });
});
