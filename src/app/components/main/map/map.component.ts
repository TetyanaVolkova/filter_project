import { Component, OnInit, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import MapFactory from "./mapFactory.service";
import CrsFactory from "../search/crsFactory.resource";
import { AgmCoreModule } from "@agm/core";
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';

declare var google: any;

@Component({
  selector: 'mapComponent',
  template: require ('./map.html')
})

export class mapComponent implements OnInit {
  
  @ViewChild('AgmMap') agmMap: AgmMap;
  objectKeys = Object.keys;
  private crss;
  private showFavorite;
  private legends;
  private redMarker;
  private pinkMarker;
  private styles;
  private mapMain;
  private sub;
  private subs;
  private subscr;
  private subscription;
  private crs;
  private favoriteCrs;
  private previous_info_window = null;
  
  constructor ( private MapFactory: MapFactory,
                private CrsFactory: CrsFactory,
                private router: Router,
                private route: ActivatedRoute,
                private cd: ChangeDetectorRef ) {

    this.MapFactory = MapFactory;
  }
  ngOnInit() {
    this.mapMain = {
      options: {
        styles: this.MapFactory.mapStyles,
        disableDefaultUI: true,
        scaleControl: true
      }
    };
    this.legends = {
      Network: this.MapFactory.getIconPath( 'Red' ),
      'NIAID Reserve': this.MapFactory.getIconPath( 'Pink' )
    };
    this.sub = this.CrsFactory.myCrss.subscribe( (crss) => {
      this.crss = crss;
      this.cd.markForCheck();
    }, 
    err => {
        // Log errors if any
        console.log(err);
    });

    this.subs = this.CrsFactory.myCrs.subscribe( (crs) => {
      this.crs = crs;
      this.cd.markForCheck();
    });

    this.subscription = this.CrsFactory.favoriteCrs.subscribe( (favoriteCrs) => {
      this.favoriteCrs = favoriteCrs;
    });

    this.subscr = this.CrsFactory.showFavorite.subscribe( ( showFavorite ) => {
      this.showFavorite = showFavorite;
    })

    this.styles = this.MapFactory.mapStyles;
    let center = 0;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subs.unsubscribe();
    this.subscr.unsubscribe();
    this.subscription.unsubscribe();
  }

  closePrevious(event, infoWindow) {
    if (this.previous_info_window !== null) {
      this.previous_info_window.close();
    }
    this.previous_info_window = infoWindow;
  }

  siteClick( crs ) {
    this.CrsFactory.myCrs.next(crs);
    this.router.navigate( ['/profile', crs.crs_id]);
  }

  isfavored( crs ) {
    this.crs = crs;
    return this.favoriteCrs.indexOf( crs ) > -1;
  };

  close_window ( event ) {
    if ( this.previous_info_window ) {
      this.previous_info_window.close();
    }
  }
  getMarker( color ) {
    if ( color = "Red") {
      return "./images/crspinred.png"
    } else if ( color = "Pink") {
      return "./images/crspinpink.png"
      }
    }
}
export default ( mapComponent );