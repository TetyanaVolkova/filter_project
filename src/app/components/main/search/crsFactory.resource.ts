
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import ContinentFactory from "./continentFactory.resource";
import { Observable } from "rxjs/Observable";

@Injectable()

export default class CrsFactory {
  myCrss = new BehaviorSubject<object>({});
  myCrs = new BehaviorSubject<object>({});
  source = new BehaviorSubject<object>({});
  lockRight = new BehaviorSubject<boolean>(true);
  lockLeft = new BehaviorSubject<boolean>(true);
  filter = new BehaviorSubject<object>({});
  chips = new BehaviorSubject<object>([]);
  filterType = new BehaviorSubject<object>({});
  loaded = new BehaviorSubject<boolean>(false);
  favoriteCrs = new BehaviorSubject<object>({});
  showFavorite = new BehaviorSubject<boolean>(false);
  public crs_type_list;
  public crss;
  public siteClick;
  public clickFavorite;
  public getObjSize;
  public alterFavorite;

  constructor( private http: HttpClient,
              private ContinentFactory: ContinentFactory ) {

    // add color list for crs type
    this.crs_type_list = {
      Red: ['funded', 'psonly', 'repreive'],
      Pink: ['unfunded']
    };
    let that = this;

    this.alterFavorite = function( crs ) {
      let favoriteCrs = this.favoriteCrs.getValue();
      let index = favoriteCrs.indexOf( crs );
      if ( index > -1 ) {
        favoriteCrs.splice( index, 1 );
        this.favoriteCrs.next(favoriteCrs);
      } else {
        favoriteCrs.push( crs );
        this.favoriteCrs.next(favoriteCrs);
      }
    };

    this.getObjSize = function( obj ) {
      let size = 0;
      for ( let lvl1 in obj ) {
        if ( obj.hasOwnProperty( lvl1 )) {
          for ( let lvl2 in obj[lvl1] ) {
            if ( obj[lvl1].hasOwnProperty( lvl2 )) {
              size = size + obj[lvl1][lvl2].length;
            }
          }
        }
      }
      return size;
    }
  };
  //add factory functions for returning data
  getCrss(): Observable<object> {
    return this.http.get('./api/crs_list');
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
}