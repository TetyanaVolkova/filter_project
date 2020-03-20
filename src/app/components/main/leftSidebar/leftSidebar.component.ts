
import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import CrsFactory from "../search/crsFactory.resource";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import {map, startWith} from 'rxjs/operators';
import { filter } from "rxjs/internal/operators/filter";
import {MatAutocompleteSelectedEvent, TooltipPosition} from '@angular/material';
import removeNetworkDialog from "../../../shared//dialogs/removeNetwork.component";
import removeNIAIDResDialog from "../../../shared/dialogs/removeNIAIDResDialog.component";
import impaactDialog from "../../../shared/dialogs/impaactDialog.component";

@Component({
  selector: 'leftSidebarComponent',
  template: require ('./crsSelections.html')
})

export class leftSidebarComponent implements OnInit, OnDestroy {

  @ViewChild('chipInput') chipInput: { nativeElement: { value: string; }; };
  @ViewChild('crsChipInput') crsChipInput: { nativeElement: { value: string; }; };
  
  chipCtrl = new FormControl();
  crsChipCtrl = new FormControl();

  objectKeys = Object.keys;

  private crss;
  private source;
  private filter;
  private filterType;
  private sub;
  private subs;
  private subscr;
  private subscrit;
  private subscrition;
  private numAnim;
  private oldVal = 0;
  private getObjSize = this.CrsFactory.getObjSize;
  private previous;
  private closeimpacct = true;
  private filterChanged;
  private chips;
  private filteredOptions;
  private crsFilteredOptions;
  private position: TooltipPosition = 'after';
  
  constructor ( private CrsFactory: CrsFactory,
                private dialog: MatDialog,
                private cd: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.subscr = this.CrsFactory.source.subscribe( ( source ) => {
      this.source = source;
    });

    this.sub = this.CrsFactory.myCrss.subscribe( (crss) => {
      this.crss = crss;
      this.cd.markForCheck();
    });
    this.subs = this.CrsFactory.filter.subscribe( (filter) => {
      this.filter = filter;
      this.crss = this.mapFilter(this.source, this.filter);
      this.CrsFactory.myCrss.next(this.crss);
    });
    this.subscrition = this.CrsFactory.filterType.subscribe( (filterType) => {
      this.filterType = filterType;
    });
    this.subscrit = this.CrsFactory.chips.subscribe( (chips) => {
      this.chips = chips;
    });
    this.chipCtrl.setValue('');
    this.crsChipCtrl.setValue('');

    this.filteredOptions = this.chipCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.crsFilteredOptions = this.crsChipCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._crsFilter(value))
    );
  }

  private _filter(value: string): string[] {
    if (value !== null) {
      const filterValue = value.toLowerCase();
      return this.filterType['pis']['attributes']['PI'].filter((option: string) => {
        return option.toLowerCase().includes(filterValue);
      });
    }
  }

  private _crsFilter(value: string): string[] {
    if (value !== null) {
      const filterValue = value.toLowerCase();
      return this.filterType['crs']['attributes']['CRS'].filter((option: string) => {
        return option.toLowerCase().includes(filterValue);
      });
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subs.unsubscribe();
    this.subscrition.unsubscribe();
    this.subscr.unsubscribe();
    this.subscrit.unsubscribe();
  }
        
  reset() {
    for ( let kind in this.filter) {
      for ( let key in this.filter[kind] ) {
        this.filter[kind][key] = [];
      }
    }
    this.chips = [];
    this.CrsFactory.filter.next(this.filter);
    this.CrsFactory.myCrss.next(this.source);
    this.CrsFactory.chips.next(this.chips);
    this.previous = null;
  };

  querySearch( text: string, object: { [x: string]: { [x: string]: any; }; } ) {
    let result = [];
    for ( let sets in object ) {
      for ( let index in object[sets] ) {
        let obj = object[sets][index];
        let pattern = new RegExp( '.*' + text + '.*', 'i' );

        if ( typeof obj === 'string' && obj.search( pattern ) != -1 ) {
          result.push( obj );
        }
      }
    }
    // sort result before output
    result.sort( function( a, b ) {
      text = text.toLowerCase();
      a = a.toLowerCase();
      b = b.toLowerCase();
      if ( a.indexOf( text ) < b.indexOf( text )) {
        return -1;
      } else if ( a.indexOf( text ) > b.indexOf( text )) {
        return 1;
      } else {
        return 0;
      }
    });

    return result;
  };

  changeFilter( net: string ) {
    this.chips = [];
    let that = this;
    for ( let lvl1 in this.filter ) {
      if ( this.filter.hasOwnProperty( lvl1 )) {
        for ( let lvl2 in this.filter[lvl1] ) {
          if ( this.filter[lvl1].hasOwnProperty( lvl2 ) ) {
            this.filter[lvl1][lvl2].forEach( function( value: any ) {
              that.chips.push({
                catagory: lvl1,
                subcat: lvl2,
                name: value
              });
            });
          }
        }
      }
    };
    this.crss = this.mapFilter( this.source, this.filter );
    this.CrsFactory.myCrss.next(this.crss);
    this.CrsFactory.chips.next(this.chips);
    if ( this.closeimpacct && net === 'IMPAACT' ) {
      const dialogRef = this.dialog.open(impaactDialog, {
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
      this.filterChanged = !this.filterChanged;
  };

  mapFilter( sites: any[], sideFilter: { [x: string]: { [x: string]: any; }; } ) {
    return sites.filter( function( crs ) {
      let response = true;
      for ( let fType in sideFilter ) {
        for ( let key in sideFilter[fType] ) {
          let result = false;
          let value = sideFilter[fType][key];
          switch ( fType ) {
            case 'crs':
              if ( value.length == 0 ) {
                result = true;
              }
              for ( let i in value ) {
                if (
                  value[i] === crs.crs_id + ' - ' + crs.crs_name ||
                  value[i] === crs.crs_name
                ) {
                  result = true;
                }
              }
              break;
            case 'epidemiology':
              let epi = crs.crspopulations;
              let temp = true;
              for ( let i in value ) {
                let exist = false;
                for ( let c in epi ) {
                  if (
                    epi[c].population_macro == key &&
                    epi[c].population_micro == value[i]
                  ) {
                    exist = true;
                  }
                }
                temp = temp && exist;
              }
              result = temp;
              break;
            case 'location':
              let continent = crs.continent;
              let state = crs.state;
              let country = crs.country;
              if ( value.length == 0 ) {
                result = true;
              } else {
                switch ( key ) {
                  case 'Continent':
                    for ( let i in value ) {
                      if ( continent == value[i] ) {
                        result = true;
                      }
                    }
                    break;
                  case 'Country':
                    for ( let i in value ) {
                      if ( country == value[i] ) {
                        result = true;
                      }
                      if ( country == null && value[i] == 'NA' ) {
                        result = true;
                      }
                    }
                    break;
                  case 'State':
                    for ( let i in value ) {
                      if ( state != null && state == value[i] ) {
                        result = true;
                      } else if ( state == null && value[i] == 'NA' ) {
                        result = true;
                      } else if (
                        country != null &&
                        value[i] == country.toUpperCase() + ' ' + ' Cities' &&
                        ( state == null || state.trim() == '' )
                      ) {
                        result = true;
                      }
                    }
                    break;
                }
              }
              break;
            case 'network':
              if ( value.length == 0 ) {
                result = true;
              } else {
                let net = crs.fundednetwork;
                for ( let i in value ) {
                  if ( net != null && net.network != null ) {
                    let temp = net.network.split( ',' );
                    for ( let j in temp ) {
                      if ( temp[j].trim() == value[i] ) {
                        result = true;
                      }
                    }
                  }
                }
                for ( let i in value ) {
                  if (
                    value[i] == 'Protocol Specific Only' &&
                    crs.crs_type === 'psonly'
                  ) {
                    result = true;
                  }
                }
              }
              break;
            case 'unfundednetwork':
              if ( value.length == 0 ) {
                result = true;
              } else {
                if ( crs.crs_type === 'unfunded' ) {
                  result = true;
                }
              }
              break;
            case 'pis':
              if ( value.length == 0 ) {
                result = true;
              } else {
                let pi = crs.pi;
                if ( pi != null ) {
                  if ( pi.ctu_pis.trim() != '' ) {
                    let tmp = pi.ctu_pis.split( ';' );
                    for ( let i in value ) {
                      for ( let j in tmp ) {
                        if ( tmp[j].trim() == value[i] ) {
                          result = true;
                        }
                      }
                    }
                  } else {
                    if ( pi.ctu_contact_pi != null ) {
                      for ( let i in value ) {
                        if ( pi.ctu_contact_pi == value[i] ) {
                          result = true;
                        }
                      }
                    }
                  }
                }
              }
              break;
          }
          response = response && result;
        }
      }
      return response;
    }); // end of sites.filter function
  } // end of mapFilter function
      
  //alert for locked Network or NIAID Reserve
  lockAlert( $event: { currentTarget: any; } ) {
    let disabled = $event.currentTarget.getAttribute('disabled');
    if(disabled === 'true') {
      if($event.currentTarget.getAttribute('aria-label') === 'NIAID Reserve CRSs') {
        const dialogRef = this.dialog.open(removeNetworkDialog, {
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      } else if (
        $event.currentTarget.getAttribute('aria-label') ===
        'NIAID HIV/AIDS Network'
      ) {
        const dialogRef = this.dialog.open(removeNIAIDResDialog, {
          height: '0'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    }
  };
   // Currently used to toggle the value for unfundednetwork.niaidReserve
  toggleFilterValue( category: string, key: string | number, value: any, $event: { currentTarget: { getAttribute: (arg0: string) => any; }; }, lock: any ) {
    if ( category === "unfundednetwork") {
      if ( lock ) {
        this.lockAlert($event);
        return;
      }
    }
    // this.filterChanged = !this.filterChanged;
    // If the key doesn't exist yet in the filter category, create it
    if ( !this.filter[category].hasOwnProperty( key )) {
      this.filter[category][key] = [value];
    } else {
      // If the key does exist in the filter, check to see if value is in the array
      // If so, remove it. If not, add it.
      let index = this.filter[category][key].indexOf( value );
      if ( index > -1 ) {
        this.filter[category][key].splice( index, 1 );
        this.CrsFactory.filter.next(this.filter);
        this.crss = this.mapFilter( this.source, this.filter );
        this.CrsFactory.myCrss.next(this.crss);
        for ( let i =0; this.chips.length; i++ ) {
          if ( this.chips[i].name === value ) {
            this.chips.splice(i, 1);
            this.CrsFactory.chips.next(this.chips);
            return;
          }
        }
        this.CrsFactory.chips.next(this.chips);
      } else {
        let disabled = $event.currentTarget.getAttribute('disabled');
        if ( disabled ) {
          this.filter[category][key].push( value );
          this.chips.push({
            catagory: category,
            subcat: key,
            name: value
          });
        }
      }
    }
    this.CrsFactory.filter.next(this.filter);
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue('');
  }

  crsSelected(event: MatAutocompleteSelectedEvent): void {
    this.crsChipInput.nativeElement.value = '';
    this.crsChipCtrl.setValue('');
  }

  closeChip($index: any, chip: { catagory: string | number; subcat: string | number; name: any; }) {
    this.chips.splice( $index, 1 );
    let index = this.filter[chip.catagory][chip.subcat].indexOf( chip.name );
    this.filter[chip.catagory][chip.subcat].splice(index,1);
    this.filter[chip.catagory][chip.subcat] = JSON.parse(JSON.stringify(this.filter[chip.catagory][chip.subcat]));
    this.CrsFactory.filter.next(this.filter);
    this.CrsFactory.chips.next(this.chips);
  };

  collapse( ft: any ) {
    if ( this.previous != ft ) {
      this.previous = ft;
    } else {
      this.previous = null;
    }
  };
}
export default ( leftSidebarComponent );