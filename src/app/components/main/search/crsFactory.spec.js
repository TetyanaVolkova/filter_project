'use strict';

import crsApp from '../../../app';

describe( 'CrsFactory', () => {
  describe( 'CrsFactory', () => {
    let CrsFactory;

    beforeEach(() => {
      angular.mock.module( crsApp );

      inject( function( _CrsFactory_ ) {
        CrsFactory = _CrsFactory_;
      });
    });

    it( 'should exist', () => {
      expect( CrsFactory ).toBeDefined();
    });

    describe( 'crs_type_list', () => {
      it( 'should exist', () => {
        expect( CrsFactory.crs_type_list ).toBeDefined();
      });
      it( 'should be an object', () => {
        expect( typeof CrsFactory.crs_type_list ).toBe( 'object' );
      });
      it( 'should include the correct CRS types', () => {
        expect( CrsFactory.crs_type_list.Red ).toEqual( [
          'funded',
          'psonly',
          'repreive'
        ] );
        expect( CrsFactory.crs_type_list.Pink ).toEqual( ['unfunded'] );
      });
    });

    describe( 'getCrss function', () => {
      let httpBackend;

      beforeEach( function() {
        inject( function( $httpBackend ) {
          httpBackend = $httpBackend;
        });
      });

      afterEach( function() {
        httpBackend.verifyNoOutstandingRequest();
      });

      let crsList = [
        {
          crs_id: 1,
          crs_name: 'Test CRS Name',
          ctu_id: '2',
          ctu_name: 'Test CTU Name',
          crs_leader: 'Test Leader Name',
          street_address: 'Test Street Address1',
          street_address2: 'Test Street Address2',
          street_address3: 'Test Street Address3',
          street_address4: 'Test Street Address4',
          internal_office_name: 'Test Office Name',
          city: 'Test City',
          state: 'MD',
          zip_code: '12345',
          country: 'United States',
          latitude: '40.362600',
          longitude: '-60.068200',
          nichd: '0',
          crs_type: 'funded',
          related_funded: [
            { crs_id: '3', crs_name: 'Test Related Name' },
            { crs_id: '4', crs_name: 'Test Related Name2' }
          ],
          related_unfunded: null,
          fundednetwork: { crs_id: 5, crs_name: 'Test Name3', network: 'ACTG' },
          pi: {
            ctu_org_id: '1',
            ctu_contact_pi: 'Last, First',
            ctu_pis: 'Last, First; Last2, First2',
            ctu_contact_pi_email: 'test@email.com',
            update_time: '2018-01-01 00:00:00'
          },
          unfundednetwork: {
            crs_id: '6',
            crs_name: 'Test Name',
            ctu_id: '7',
            ctu_name: 'Test CTU Name',
            leader_name: 'Last, First',
            network: null
          },
          psprotocols: [],
          regulatory: {
            id: 1,
            ctu_name: 'Test Name',
            associated_regulatory_crs: 'Test Name',
            crs_id: 1,
            regulatory_authority_name: null,
            local_irb_ec_name: 'Test Name',
            other_irb_ec_name: null,
            established_ibc: 'Yes',
            ibc_name: 'Test Name',
            language: 'English',
            cti_needed: 'No'
          },
          ocsostaff: {
            crs_id: '1',
            ctu_id: '2',
            po_name: 'Last First',
            email: 'test@email.com'
          },
          laboratories: [
            {
              lab_id: 1,
              lab_name: 'Test Name',
              location: 'Test Address',
              PoC_name: 'Test Name',
              PoC_address: 'Test Address',
              certification: 'Test Certification',
              networks: 'ACTG',
              LDMS: null,
              qa_services: null,
              lab_test_performed: 'Lab Test',
              Certified_By: 'Test Organization',
              Latitude: '40.862600',
              Longtitude: '-60.868200',
              related_lab: []
            }
          ],
          pharmacies: [
            {
              phar_id: 1,
              phar_name: 'Test Pharmacy',
              PoR_name: null,
              location: 'Test Location',
              synonym: 'Test',
              networks: 'ACTG,Non-Network',
              contact: null,
              site_restriction_type: null,
              pharmacy_capability:
                '-10° Freezer Storage Approval, -50° Freezer Storage Approval',
              long_name: 'Test Long Name',
              related_phar: []
            }
          ],
          coordinator: {
            crs_id: 1,
            crs_name: 'Test CRS Name',
            CRS_COORDINATOR_NAME: 'Test Name',
            CRS_COORDINATOR_MI: '',
            upd_time: '2018-01-01 00:00:00'
          },
          crspopulations: [
            {
              crs_pop_id: 1,
              crs_id: '1',
              population_macro: 'Gender',
              population_micro: 'Female'
            }
          ]
        }
      ];

      it( 'should exist', () => {
        expect( CrsFactory.getCrss ).toBeDefined();
      });

      it( 'should run when invoked', function() {
        var getCrssSpy = spyOn( CrsFactory, 'getCrss' );
        CrsFactory.getCrss();
        expect( getCrssSpy ).toHaveBeenCalled();
      });

      it( 'should be asynchronous', done => {
        httpBackend.expectGET( './api/crs_list' ).respond( crsList );

        CrsFactory.getCrss().then( result => {
          expect( result ).toBeTruthy();
          done();
        });

        httpBackend.flush();
      });

      it( 'should return a promise', () => {
        httpBackend.expectGET( './api/crs_list' ).respond( crsList );

        expect( typeof CrsFactory.getCrss().then ).toBe( 'function' );

        httpBackend.flush();
      });
    });
  });
});
