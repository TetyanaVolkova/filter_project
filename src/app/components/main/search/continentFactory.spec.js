'use strict';

import crsApp from '../../../app';

describe( 'ContinentFactory', () => {
  let ContinentFactory;

  beforeEach(() => {
    angular.mock.module( crsApp );

    inject( function( _ContinentFactory_ ) {
      ContinentFactory = _ContinentFactory_;
    });
  });

  it( 'should exist', () => {
    expect( ContinentFactory ).toBeDefined();
  });

  it( 'should be an object', () => {
    expect( typeof ContinentFactory ).toBe( 'object' );
  });

  describe( 'Africa array', () => {
    let africa;

    beforeEach(() => {
      africa = ContinentFactory.Africa;
    });

    it( 'should match the expected values for Africa', () => {
      let expectedAfricaValues = [
        'Algeria',
        'Angola',
        'Benin',
        'Botswana',
        'Burkina',
        'Burundi',
        'Cameroon',
        'Cape Verde',
        'Central African Republic',
        'Chad',
        'Comoros',
        'Congo',
        'Congo, Democratic Republic of',
        'Djibouti',
        'Egypt',
        'Equatorial Guinea',
        'Eritrea',
        'Ethiopia',
        'Gabon',
        'Gambia',
        'Ghana',
        'Guinea',
        'Guinea-Bissau',
        'Ivory Coast',
        'Kenya',
        'Lesotho',
        'Liberia',
        'Libya',
        'Madagascar',
        'Malawi',
        'Mali',
        'Mauritania',
        'Mauritius',
        'Morocco',
        'Mozambique',
        'Namibia',
        'Niger',
        'Nigeria',
        'Rwanda',
        'Sao Tome and Principe',
        'Senegal',
        'Seychelles',
        'Sierra Leone',
        'Somalia',
        'South Africa',
        'South Sudan',
        'Sudan',
        'Swaziland',
        'Tanzania',
        'Togo',
        'Tunisia',
        'Uganda',
        'Zambia',
        'Zimbabwe'
      ];

      expect( africa ).toEqual( expectedAfricaValues );
    });

    it( 'should instantiate with 54 countries', () => {
      expect( africa.length ).toEqual( 54 );
    });

    it( 'should contain the expected index values', () => {
      expect( africa[0] ).toEqual( 'Algeria' );
      expect( africa[5] ).toEqual( 'Burundi' );
      expect( africa[10] ).toEqual( 'Comoros' );
      expect( africa[15] ).toEqual( 'Equatorial Guinea' );
      expect( africa[20] ).toEqual( 'Ghana' );
      expect( africa[25] ).toEqual( 'Lesotho' );
      expect( africa[30] ).toEqual( 'Mali' );
      expect( africa[35] ).toEqual( 'Namibia' );
      expect( africa[40] ).toEqual( 'Senegal' );
      expect( africa[45] ).toEqual( 'South Sudan' );
      expect( africa[50] ).toEqual( 'Tunisia' );
      expect( africa[53] ).toEqual( 'Zimbabwe' );
    });
  });

  describe( 'Asia array', () => {
    let asia;

    beforeEach(() => {
      asia = ContinentFactory.Asia;
    });

    it( 'should match the expected values for Asia', () => {
      let expectedAsiaValues = [
        'Afghanistan',
        'Bahrain',
        'Bangladesh',
        'Bhutan',
        'Brunei',
        'Burma (Myanmar)',
        'Cambodia',
        'China',
        'East Timor',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Israel',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Korea, North',
        'Korea, South',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Lebanon',
        'Malaysia',
        'Maldives',
        'Mongolia',
        'Nepal',
        'Oman',
        'Pakistan',
        'Philippines',
        'Qatar',
        'Russian Federation',
        'Saudi Arabia',
        'Singapore',
        'Sri Lanka',
        'Syria',
        'Tajikistan',
        'Thailand',
        'Turkey',
        'Turkmenistan',
        'United Arab Emirates',
        'Uzbekistan',
        'Viet Nam',
        'Yemen'
      ];

      expect( asia ).toEqual( expectedAsiaValues );
    });

    it( 'should instantiate with 45 countries', () => {
      expect( asia.length ).toEqual( 44 );
    });

    it( 'should contain the expected index values', () => {
      expect( asia[1] ).toEqual( 'Bahrain' );
      expect( asia[6] ).toEqual( 'Cambodia' );
      expect( asia[9] ).toEqual( 'India' );
      expect( asia[16] ).toEqual( 'Kazakhstan' );
      expect( asia[21] ).toEqual( 'Laos' );
      expect( asia[26] ).toEqual( 'Nepal' );
      expect( asia[31] ).toEqual( 'Russian Federation' );
      expect( asia[36] ).toEqual( 'Tajikistan' );
      expect( asia[41] ).toEqual( 'Uzbekistan' );
      expect( asia[43] ).toEqual( 'Yemen' );
    });
  });

  describe( 'Europe array', () => {
    let europe;

    beforeEach(() => {
      europe = ContinentFactory.Europe;
    });

    it( 'should match the expected values for Europe', () => {
      let expectedEuropeValues = [
        'Albania',
        'Andorra',
        'Armenia',
        'Austria',
        'Azerbaijan',
        'Belarus',
        'Belgium',
        'Bosnia and Herzegovina',
        'Bulgaria',
        'Croatia',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Georgia',
        'Germany',
        'Greece',
        'Hungary',
        'Iceland',
        'Ireland',
        'Italy',
        'Latvia',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macedonia',
        'Malta',
        'Moldova',
        'Monaco',
        'Montenegro',
        'Netherlands',
        'Norway',
        'Poland',
        'Portugal',
        'Romania',
        'San Marino',
        'Serbia',
        'Slovakia',
        'Slovenia',
        'Spain',
        'Sweden',
        'Switzerland',
        'Ukraine',
        'United Kingdom',
        'Vatican City'
      ];

      expect( europe ).toEqual( expectedEuropeValues );
    });

    it( 'should instantiate with 47 countries', () => {
      expect( europe.length ).toEqual( 47 );
    });

    it( 'should contain the expected index values', () => {
      expect( europe[0] ).toEqual( 'Albania' );
      expect( europe[10] ).toEqual( 'Cyprus' );
      expect( europe[15] ).toEqual( 'France' );
      expect( europe[20] ).toEqual( 'Iceland' );
      expect( europe[25] ).toEqual( 'Lithuania' );
      expect( europe[30] ).toEqual( 'Monaco' );
      expect( europe[35] ).toEqual( 'Portugal' );
      expect( europe[40] ).toEqual( 'Slovenia' );
      expect( europe[45] ).toEqual( 'United Kingdom' );
      expect( europe[46] ).toEqual( 'Vatican City' );
    });
  });

  describe( 'N. America array', () => {
    let northAmerica;

    beforeEach(() => {
      northAmerica = ContinentFactory['N. America'];
    });

    it( 'match the expected values for N. America', () => {
      let expectedNorthAmericaValues = [
        'Antigua and Barbuda',
        'Bahamas',
        'Barbados',
        'Belize',
        'Canada',
        'Costa Rica',
        'Cuba',
        'Dominica',
        'Dominican Republic',
        'El Salvador',
        'Grenada',
        'Guatemala',
        'Haiti',
        'Honduras',
        'Jamaica',
        'Mexico',
        'Nicaragua',
        'Panama',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Trinidad and Tobago',
        'United States'
      ];

      expect( northAmerica ).toEqual( expectedNorthAmericaValues );
    });

    it( 'should instantiate with 23 countries', () => {
      expect( northAmerica.length ).toEqual( 23 );
    });

    it( 'should contain the expected index values', () => {
      expect( northAmerica[0] ).toEqual( 'Antigua and Barbuda' );
      expect( northAmerica[5] ).toEqual( 'Costa Rica' );
      expect( northAmerica[10] ).toEqual( 'Grenada' );
      expect( northAmerica[16] ).toEqual( 'Nicaragua' );
      expect( northAmerica[20] ).toEqual( 'Saint Vincent and the Grenadines' );
      expect( northAmerica[22] ).toEqual( 'United States' );
    });
  });

  describe( 'Oceania array', () => {
    let oceania;

    beforeEach(() => {
      oceania = ContinentFactory.Oceania;
    });

    it( 'should match the expected values for Oceania', () => {
      let expectedOceaniaValues = [
        'Australia',
        'Fiji',
        'Kiribati',
        'Marshall Islands',
        'Micronesia',
        'Nauru',
        'New Zealand',
        'Palau',
        'Papua New Guinea',
        'Samoa',
        'Solomon Islands',
        'Tonga',
        'Tuvalu',
        'Vanuatu'
      ];

      expect( oceania ).toEqual( expectedOceaniaValues );
    });

    it( 'should instantiate with 14 countries', () => {
      expect( oceania.length ).toEqual( 14 );
    });

    it( 'should contain the expected index values', () => {
      expect( oceania[1] ).toEqual( 'Fiji' );
      expect( oceania[5] ).toEqual( 'Nauru' );
      expect( oceania[9] ).toEqual( 'Samoa' );
      expect( oceania[13] ).toEqual( 'Vanuatu' );
    });
  });

  describe( 'S. America array', () => {
    let southAmerica;

    beforeEach(() => {
      southAmerica = ContinentFactory['S. America'];
    });

    it( 'should match the expected values for S. America', () => {
      let expectedSouthAmericaValues = [
        'Argentina',
        'Bolivia',
        'Brazil',
        'Chile',
        'Colombia',
        'Ecuador',
        'Guyana',
        'Paraguay',
        'Peru',
        'Suriname',
        'Uruguay',
        'Venezuela'
      ];

      expect( southAmerica ).toEqual( expectedSouthAmericaValues );
    });

    it( 'should instantiate with 12 countries', () => {
      expect( southAmerica.length ).toEqual( 12 );
    });

    it( 'should contain the expected index values', () => {
      expect( southAmerica[0] ).toEqual( 'Argentina' );
      expect( southAmerica[2] ).toEqual( 'Brazil' );
      expect( southAmerica[6] ).toEqual( 'Guyana' );
      expect( southAmerica[9] ).toEqual( 'Suriname' );
      expect( southAmerica[11] ).toEqual( 'Venezuela' );
    });
  });
});
