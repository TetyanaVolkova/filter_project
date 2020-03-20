
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { Router, ActivatedRoute, Params, RoutesRecognized } from "@angular/router";

import MapFactory from "../map/mapFactory.service";
import CrsFactory from "./crsFactory.resource";
import ContinentFactory from "./continentFactory.resource";

@Component({
  selector: 'searchParentComponent',
  template: require ('../main.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class searchParentComponent implements OnInit, OnDestroy {
  
  private mapStyles;
  private appSettings;
  private title;
  private subscription;
  private mainView;
  private profileView;
  private filterType;
  private source;
  private crss;
  private loaded;
  private filter;
  private lockLeft;
  private fileSize = 0;
  private selectedItem;
  private crs;
  private filterChanged;
  private selectedSite;
  private showLeftNav;
  private searchText;
  private opened: boolean;
  private subs;
  private sub;
  private subscr;
  private subscra;
  private subLockLeft;
  private param;
  private showFavorite;
  private favoriteCrs = [];
  private lockRight;
  
  constructor ( private MapFactory: MapFactory,
                private CrsFactory: CrsFactory,
                private ContinentFactory: ContinentFactory,
                private router: Router,
                private route: ActivatedRoute,
                private cd: ChangeDetectorRef ) {

    this.CrsFactory.loaded.next(false);
    // this.crs['crs_name'] = "";
    // this.source = {}
    this.filterChanged = false;
    //Adding options to the map
    this.selectedSite = null;
    //Add the main map defaults for use with the
    //Angular Maps Directive
    //Map option for all the minimaps
    //currently these maps are comments out
    //Left Nav Show defaults to true
    this.showLeftNav = true;
    //Loading variable to tell if the page is loaded fully for when we need to implement the loading screen
    // this.loaded = false;
    //Text variable for when the user is search for a specific site.
    this.searchText = null;
    //Item in menu that is selected
    this.selectedItem = null;
    //List of filter variables used to manage the list of sites

    //Some helper text for the visualization button
    //Title bar for when in profile pages
    this.title = '';
    
    //Some names are changed according to client's request
    /**
     * Screen Show Hide Variables
     * @type {Boolean}
     */
    this.lockLeft = true;
    this.filter = {};
    this.filterType = {};
    this.CrsFactory = CrsFactory;
    this.appSettings = {
      title: 'NIAID Explorer: Clinical Research Sites',
      version: '1.0'
    };

    this.mapStyles = this.MapFactory.mapStyles;
  }
  ngOnInit() {
    this.subscra = this.CrsFactory.lockRight.subscribe( (lockRight) => {
      this.lockRight = lockRight;
    });

    this.subLockLeft = this.CrsFactory.lockLeft.subscribe( (lockLeft) => {
      this.lockLeft = lockLeft;
    })

    this.subscr = this.CrsFactory.showFavorite.subscribe( (showFavorite) => {
      this.showFavorite = showFavorite;
    });

    this.CrsFactory.favoriteCrs.next(this.favoriteCrs);
    this.sub = this.CrsFactory.getCrss().subscribe(
    crss => {
      this.CrsFactory.myCrss.next(crss);
      this.source = crss;
      let crs = {};
      let that = this;
      this.source.forEach( function( crs ) {
        if ( crs.crs_id == that.param.crs_id) {
          that.CrsFactory.myCrs.next(crs);
        }
      });

      let epidemiology = {};
      let sortGender = ['Female', 'Male', 'Transgender'];
      let sortAge = [
        'Infant',
        'Children',
        'Adolescents (13-17)',
        'Young Adult (18-24)',
        'Adult'
      ];
      let sortDC = [
        'HIV Uninfected',
        'HIV Exposed',
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
      ];
      let location = {};
      let pis = [];

      this.filter['pis'] = [];
      this.filter['crs'] = [];
      this.filter['network'] = [];
      this.filter['unfundednetwork'] = [];
      this.filter['location'] = [];
      this.filter['epidemiology'] = [];

      this.filter['pis']['PI'] = [];
      this.filter['crs']['CRS'] = [];
      this.filter['network']['NIAID HIV/AIDS Network'] = [];
      this.filter['unfundednetwork']['status'] = [];
      this.filter['location']['Continent'] = [];
      this.filter['epidemiology']['epidemiology'] = [];

      let network = {};
      let unfundednetwork = {};
      let crs_type_list = this.CrsFactory.crs_type_list;
      let crs_coords_dup = {};
      let all_coords = {};
      //Flatten the crs coordinates into
      //one coords object
      for ( let key in this.source ) {
        // create crs
        let crs_id = this.source[key].crs_id.toString();
        let crs_name = this.source[key].crs_name;
        let crs_string = crs_id + ' - ' + crs_name;
        this.setFilter( crs, 'CRS', crs_string );
  
        // set color property based on crs_type
        for ( let color in crs_type_list ) {
          if ( crs_type_list[color].indexOf( this.source[key].crs_type ) !== -1 ) {
            this.source[key].color = color;
          }
        }
  
        // create epidemiology by Tetyana
        let cps = this.source[key].crspopulations;
        for ( let index in cps ) {
          let placeholder = cps[index].population_macro;
          let selection = cps[index].population_micro;
          if ( placeholder == 'Race/Ethnicity' ) {
            if (
              selection.toLowerCase() == 'hispanic or latino' ||
              selection.toLowerCase() == 'not hispanic or latino'
            ) {
              placeholder = 'Ethnicity';
              if ( selection.toLowerCase() == 'hispanic or latino' ) {
                selection = 'Hispanic or Latino';
                cps[index].population_micro = selection;
              } else {
                selection = 'Not Hispanic or Latino';
                cps[index].population_micro = selection;
              }
            } else {
              placeholder = 'Race';
            }
            cps[index].population_macro = placeholder;
          }
  
          // Removing Lesbians from the Left Nav subfilter
  
          if ( placeholder !== 'Risk Factor' || selection !== 'Lesbian' ) {
            this.setFilter( epidemiology, placeholder, selection );
          }
        }
  
        // remove invalid data
        delete epidemiology['None'];
        delete epidemiology['NULL'];
  
        // create location
        let continent = 'NA';
        for ( let i in this.ContinentFactory ) {
          for ( let j in this.ContinentFactory[i] ) {
            if (
              this.source[key].country != null &&
              this.ContinentFactory[i][j] === this.source[key].country
            ) {
              this.source[key].continent = i;
              this.source[key].country = this.ContinentFactory[i][j];
              continent = i;
            }
          }
          if ( continent === 'NA' ) {
            this.source[key].continent = continent;
          }
        }
        let country = this.source[key].country;
        let state = this.source[key].state;
        // let city = that.source[key].city;
  
        if ( location[continent] == null ) {
          location[continent] = {};
        }
        // if (location[continent][country] == null)
        // {
        //     location[continent][country] = {};
        // }
        if ( state == null || state.trim() == '' ) {
          if ( country == null || country.trim() == '' ) {
            country = 'NA';
            state = 'NA';
          } else {
            state = country.toUpperCase() + ' ' + ' Cities';
          }
        } else {
          state = state.trim();
        }
        // this.setFilter(location[continent][country], state, city);
        this.setFilter( location[continent], country, state );
  
        // create network object to store an array of avilable network options
        // that will populate the leftNav sub-selections
        let funded = this.source[key].fundednetwork;
  
        if ( funded != null ) {
          if ( funded.network != null ) {
            // begin: add psonly filter by Jiazhen
            let psOnlyFlag = this.source[key].crs_type === 'psonly';
            if ( psOnlyFlag ) {
              this.setFilter(
                network,
                'NIAID HIV/AIDS Network',
                'Protocol Specific Only'
              );
            }
            // end: add psonly filter by Jiazhen
            let temp = funded.network.split( ',' );
            for ( let index in temp ) {
              this.setFilter( network, 'NIAID HIV/AIDS Network', temp[index].trim());
            }
          }
        } else {
          // Add NIAID Reserve property
  
          // create unfundednetwork object to store an array of avilable unfundednetwork options
          // that will populate the leftNav sub-selections
          let unfunded = this.source[key].unfundednetwork;
          if ( unfunded != null ) {
            if ( unfunded.network != null ) {
              let temp = unfunded.network.split( ',' );
              for ( let index in temp ) {
                this.setFilter( unfundednetwork, 'NIAID Reserve', temp[index].trim());
              }
            }
          }
        }
  
        // create PIS
        let pi = this.source[key].pi;
        if ( pi != null ) {
          let ctupi = pi.ctu_pis.trim();
          if ( ctupi != null && ctupi != '' ) {
            let tmp = ctupi.split( /\s*;\s*/ );
            for ( let index in tmp ) {
              tmp.sort();
              pi.ctu_pis = tmp.join( '; ' );
              this.setFilter( pis, 'PI', tmp[index].trim());
            }
          } else {
            this.setFilter( pis, 'PI', pi.ctu_contact_pi.trim());
          }
        }
  
        // change coords
        this.source[key].center = {
          latitude: this.source[key].latitude,
          longitude: this.source[key].longitude
        };
        this.source[key].coords = {
          latitude: this.source[key].latitude,
          longitude: this.source[key].longitude
        };
        delete this.source[key].latitude;
        delete this.source[key].longitude;
  
        // set lab map params
        let that = this;
        this.source[key].laboratories.forEach( function( lab ) {
          lab.center = { latitude: lab.Latitude, longitude: lab.Longtitude };
          lab.coords = { latitude: lab.Latitude, longitude: lab.Longtitude };
          if (
            lab.coords.latitude === that.source[key].coords.latitude &&
            lab.coords.longitude &&
            that.source[key].coords.longitude
          ) {
            lab.coords.latitude = +lab.coords.latitude + 0.00001;
            lab.coords.longitude = +lab.coords.longitude + 0.00001;
          }
          delete lab.Latitude;
          delete lab.Longtitude;
        });
  
        // This function is used to find the CRSs with the same location
        let loc =
          this.source[key].coords.latitude +
          ', ' +
          this.source[key].coords.longitude;
  
        if ( all_coords.hasOwnProperty( loc )) {
          all_coords[loc].push( key );
          crs_coords_dup[loc] = all_coords[loc];
        } else {
          all_coords[loc] = [key];
        }
  
        // This function is used to change form for test performed, new added 07/14/2015 by Wei
        this.source[key].laboratories.forEach( function( lab ) {
          if (
            lab.lab_test_performed !== null &&
            lab.lab_test_performed !== undefined
          ) {
            let result = [];
            lab.lab_test_performed = lab.lab_test_performed
              .replace( /\s*,\s*/g, ',' )
              .replace( /^\s*/, '' )
              .replace( /\s*$/, '' )
              .split( ',' );
            lab.lab_test_performed.forEach( function( tp ) {
              if ( result.indexOf( tp ) === -1 ) {
                result.push( tp );
              }
            });
            lab.lab_test_performed = result.sort();
            if ( lab.lab_test_performed.length < 3 ) {
              // \u2003 is an Unicode Character 'INVISIBLE SEPARATOR' used to fix layout problem with one or two elements in array
              lab.lab_test_performed.push( '\u2003' );
            }
          }
        });
      }
  
      // Change the CRSs with the same coords, loop for every 8 CRSs
      for ( let k in crs_coords_dup ) {
        let indexes = crs_coords_dup[k];
        let len = crs_coords_dup[k].length;
        let q1, q2;
        for ( let i = 0; i < len; i++ ) {
          let p = Math.ceil(( i + 1 ) / 8 );
          let circle = Math.floor( len / 4 );
          let j = Number( indexes[i] );
          if ( circle == 0 ) {
            q1 = 0.00001 * p;
            q2 = 0.00001 * p;
          } else {
            q1 = Math.pow( 0.00001 * p, Math.floor( i / 2 ) % 2 );
            q2 = Math.pow( 0.00001 * p, Number( !(Math.floor( i / 2 ) % 2) ));
          }
  
          this.source[j].coords.latitude =
            +this.source[j].coords.latitude +
            q1 * Math.pow( -1, Math.floor( i / 2 ));
          this.source[j].coords.longitude =
            +this.source[j].coords.longitude + q2 * Math.pow( -1, i );
        }
      }
  
      this.source.sort( function( a, b ) {
        if ( a.color === b.color ) {
          if ( a.crs_name.toUpperCase() < b.crs_name.toUpperCase()) {
            return -1;
          } else if ( a.crs_name.toUpperCase() > b.crs_name.toUpperCase()) {
            return 1;
          } else {
            return 0;
          }
        } else if ( a.color === 'Red' && b.color === 'Pink' ) {
          return -1;
        } else if ( a.color === 'Pink' && b.color === 'Red' ) {
          return 1;
        }
      });
  
      // sort filter's choice
      epidemiology['Race'].sort();
      epidemiology['Ethnicity'].sort();
      // if( epidemiology["Risk Factor"].indexOf( 'MTCT' ) <= -1 ) {
      // epidemiology["Risk Factor"].push( 'MTCT' ); } //JUST FAKE ADDED, delete if DB is updated
      epidemiology['Risk Factor'].sort();
  
      function sortBy( origin, sortList ) {
        origin.sort( function( a, b ) {
          let indexa = sortList.indexOf( a );
          let indexb = sortList.indexOf( b );
          return indexa - indexb;
        });
      }
  
      sortBy( epidemiology['Disease/Condition'], sortDC );
      sortBy( epidemiology['Age'], sortAge );
      sortBy( epidemiology['Gender'], sortGender );
      network['NIAID HIV/AIDS Network'].sort();
      if ( unfundednetwork['NIAID Reserve'] !== undefined ) {
        unfundednetwork['NIAID Reserve'].sort();
      }
  
      // Set the sub-categories in leftNav menu
      this.filterType['crs'] = [];
      this.filterType['network'] = [];
      this.filterType['unfundednetwork'] = [];
      this.filterType['location'] = [];
      this.filterType['epidemiology'] = [];
      this.filterType['pis'] = [];

      that.filterType['crs']['attributes'] = crs;
      that.filterType['network']['attributes'] = network;
      that.filterType['unfundednetwork']['attributes'] = unfundednetwork;
      that.filterType['location']['attributes'] = location;
      that.filterType['epidemiology']['attributes'] = epidemiology;
      that.filterType['pis']['attributes'] = pis;

      let filterKey = [
        'crs',
        'network',
        'unfundednetwork',
        'location',
        'epidemiology',
        'pis'
      ];
      let filterName = [
        'Clinical Research Site (CRS)',
        'Network',
        'NIAID Reserve',
        'Region',
        'Population Characteristics',
        'Principal Investigator (PI)'
      ]; 

      for ( let index in filterName ) {
        // this.filterType[filterKey[index]] = {};
        this.filterType[filterKey[index]]['name'] = filterName[index];
        // this.filterType[filterKey[index]]['attributes'] = {};
        // this.filter[filterKey[index]] = {};
      }
      this.CrsFactory.filter.next(this.filter);
      this.CrsFactory.filterType.next(this.filterType);
      this.CrsFactory.source.next(this.source);
      this.CrsFactory.loaded.next(true);
    }
  );

    this.subs = this.CrsFactory.loaded.subscribe(
      loaded => {
        this.loaded = loaded;
        this.cd.markForCheck();
      });
      // debug use only !!!
      // console.log(that.source);
      // console.log(visible);
      // console.log(that.filterType);
      // console.log(that.filter);
      // console.log(ContinentFactory); 
      // end of that.init().then call

    this.router.events.subscribe((url:any) => {
      if (url instanceof RoutesRecognized) {
        this.param = url.state.root.firstChild.params;
      }

      if ( this.router.url === "/map") {
        // let that = this;

        // this.$timeout(
        //   function() {
        //   that.uiGmapIsReady.promise()
        //   .then(function (map_instances) {
        //     let map = map_instances[0].map;
        //     that.MapFactory.mapRefresh( map );
        //     that.MapFactory.autoZoom( that.crss, map );
        //   });
        // }, 1000);
        this.title = document.title = "MAP | CRS Explorer";
      } else if( this.router.url === "/viz" ) {
        this.title = document.title = "GRAPH | CRS Explorer";
      } else if( this.router.url.includes("/profile") ) {
        this.title = document.title = "PROFILE | CRS Explorer";
      } else if( this.router.url.includes("/labs") ) {
        this.title = document.title = "LABS | CRS Explorer";
      } else if( this.router.url.includes("/pharms") ) {
        this.title = document.title = "PHARMACY | CRS Explorer";
      } else if( this.router.url.includes("/ep") ) {
        this.title = document.title = "POPULATION CHARACTERISTICS | CRS Explorer";
        
      } else if( this.router.url === "/") {
        this.title = document.title = "CRS Explorer";
      } else if( this.router.url === "/about" ) {
        this.title = document.title = "ABOUT | CRS Explorer";
      } else if( this.router.url === "/tutorial" ) {
        this.title = document.title = "TUTORIAL | CRS Explorer";
      } else if( this.router.url.includes("/glossary" )) {
        this.title = document.title = "GLOSSARY | CRS Explorer";
      } else if( this.router.url === "/contactUs" ) {
        this.title = document.title = "CONTACT US | CRS Explorer";
      }  else { this.title = document.title = "ERROR | CRS Explorer"; } 

      if (this.router.url === "/" ||
      this.router.url === ("/about") ||
      this.router.url === ("/tutorial") ||
      this.router.url.includes("/glossary") ||
      this.router.url === ("/contactUs")) {
      this.mainView = false;
      } else { 
        this.mainView = true; 
      }

      if ( this.router.url.includes("/profile") ||
           this.router.url.includes("/labs") ||
           this.router.url.includes("/pharms") ||
           this.router.url.includes("/epi")) {
        this.profileView = true;
      } else {
        this.profileView = false;
      }
    });
  }

  setFilter( hashtable, key, value ) {
    if ( value != null && value.trim() != '' ) {
      if ( hashtable[key] == null ) {
        hashtable[key] = [];
      }
      if ( hashtable[key].indexOf( value ) == -1 ) {
        hashtable[key].push( value );
      }
    }
  }

  // mapFilter( sites, sideFilter ) {
  //   return sites.filter( function( crs ) {
  //     let response = true;
  //     for ( let fType in sideFilter ) {
  //       for ( let key in sideFilter[fType] ) {
  //         let result = false;
  //         let value = sideFilter[fType][key];
  //         switch ( fType ) {
  //           case 'crs':
  //             if ( value.length == 0 ) {
  //               result = true;
  //             }
  //             for ( let i in value ) {
  //               if (
  //                 value[i] === crs.crs_id + ' - ' + crs.crs_name ||
  //                 value[i] === crs.crs_name
  //               ) {
  //                 result = true;
  //               }
  //             }
  //             break;
  //           case 'epidemiology':
  //             let epi = crs.crspopulations;
  //             let temp = true;
  //             for ( let i in value ) {
  //               let exist = false;
  //               for ( let c in epi ) {
  //                 if (
  //                   epi[c].population_macro == key &&
  //                   epi[c].population_micro == value[i]
  //                 ) {
  //                   exist = true;
  //                 }
  //               }
  //               temp = temp && exist;
  //             }
  //             result = temp;
  //             break;
  //           case 'location':
  //             let continent = crs.continent;
  //             // let city = crs.city;
  //             let state = crs.state;
  //             let country = crs.country;
  //             if ( value.length == 0 ) {
  //               result = true;
  //             } else {
  //               switch ( key ) {
  //                 case 'Continent':
  //                   for ( let i in value ) {
  //                     if ( continent == value[i] ) {
  //                       result = true;
  //                     }
  //                   }
  //                   break;
  //                 case 'Country':
  //                   for ( let i in value ) {
  //                     if ( country == value[i] ) {
  //                       result = true;
  //                     }
  //                     if ( country == null && value[i] == 'NA' ) {
  //                       result = true;
  //                     }
  //                   }
  //                   break;
  //                 case 'State':
  //                   for ( let i in value ) {
  //                     if ( state != null && state == value[i] ) {
  //                       result = true;
  //                     } else if ( state == null && value[i] == 'NA' ) {
  //                       result = true;
  //                     } else if (
  //                       country != null &&
  //                       value[i] == country.toUpperCase() + ' ' + ' Cities' &&
  //                       ( state == null || state.trim() == '' )
  //                     ) {
  //                       result = true;
  //                     }
  //                   }
  //                   break;
  //                 // case "City":
  //                 //     for(let i in value)
  //                 //     {
  //                 //         if (city == value[i])
  //                 //         {
  //                 //             result = true;
  //                 //         }
  //                 //     }
  //                 //     break;
  //               }
  //             }
  //             break;
  //           case 'network':
  //             if ( value.length == 0 ) {
  //               result = true;
  //             } else {
  //               let net = crs.fundednetwork;
  //               for ( let i in value ) {
  //                 if ( net != null && net.network != null ) {
  //                   let temp = net.network.split( ',' );
  //                   for ( let j in temp ) {
  //                     if ( temp[j].trim() == value[i] ) {
  //                       result = true;
  //                     }
  //                   }
  //                 }
  //               }
  //               for ( let i in value ) {
  //                 if (
  //                   value[i] == 'Protocol Specific Only' &&
  //                   crs.crs_type === 'psonly'
  //                 ) {
  //                   result = true;
  //                 }
  //               }
  //             }
  //             break;
  //           case 'unfundednetwork':
  //             if ( value.length == 0 ) {
  //               result = true;
  //             } else {
  //               if ( crs.crs_type === 'unfunded' ) {
  //                 result = true;
  //               }
  //             }
  //             break;
  //           case 'pis':
  //             if ( value.length == 0 ) {
  //               result = true;
  //             } else {
  //               let pi = crs.pi;
  //               if ( pi != null ) {
  //                 if ( pi.ctu_pis.trim() != '' ) {
  //                   let tmp = pi.ctu_pis.split( ';' );
  //                   for ( let i in value ) {
  //                     for ( let j in tmp ) {
  //                       if ( tmp[j].trim() == value[i] ) {
  //                         result = true;
  //                       }
  //                     }
  //                   }
  //                 } else {
  //                   if ( pi.ctu_contact_pi != null ) {
  //                     for ( let i in value ) {
  //                       if ( pi.ctu_contact_pi == value[i] ) {
  //                         result = true;
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //             break;
  //         }
  //         response = response && result;
  //       }
  //     }
  //     return response;
  //   }); // end of sites.filter function
  // } // end of mapFilter function

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscr.unsubscribe();
    this.subscra.unsubscribe();
    this.subLockLeft.unsubscribe();
    this.subs.unsubscribe();
    this.sub.unsubscribe();
  }
}
export default ( searchParentComponent );