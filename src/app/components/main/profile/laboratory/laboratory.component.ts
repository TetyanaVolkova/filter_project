

import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import MapFactory from "../../map/mapFactory.service";
import CrsFactory from "../../search/crsFactory.resource";

@Component({
  selector: 'laboratoryComponent',
  template: require ('./laboratory.html')
})

export class laboratoryComponent implements OnInit {
  objectKeys = Object.keys;
  private crs;
  // @Input() private source;
  // @Input() private selectedSite;
  private labMarker;
  private legends;
  private styles;
  private lat;
  private lng;
  private marker;
  private subs;

  constructor  (private CrsFactory: CrsFactory,
                private MapFactory: MapFactory,
                private cd: ChangeDetectorRef) {
    this.MapFactory = MapFactory;
  }
  // Beginning ngOnInit 

  ngOnInit() {
    this.subs = this.CrsFactory.myCrs.subscribe( (crs) => {
      this.crs = crs;
      this.cd.markForCheck();
      this.marker = {
        url: this.MapFactory.getIconPath( this.crs.color ),
        scaledSize: {
          width: 25,
          height: 25
        }
      };
      this.lat = parseFloat(this.crs.coords.latitude);
      this.lng = parseFloat(this.crs.coords.longitude);
  
      this.legends = {
        'Main Clinic Location': this.MapFactory.getIconPath( this.crs.color ),
        'Laboratory Location': this.MapFactory.getIconPath( 'lab' )
      };
    });
    // this.crs = this.getCrs();
    this.styles = this.MapFactory.mapStyles;
    this.labMarker = this.MapFactory.labMarker;
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // End ngOnInit

  convertNum( coords ) {
    return parseFloat( coords )
  } 

  // getCrs() {
  //   let that = this;
  //   var result = {};
  //   if ( this.selectedSite != null ) {
  //     result = this.selectedSite;
  //     this.selectedSite = null;
  //   } else {
  //     // this.source.forEach( function( crs ) {
  //     //   if ( crs.crs_name === url.snapshot.params.crs_name ) {
  //     //     result = crs;
  //     //   }
  //     // });
  //   }
  //   // if ( Object.getOwnPropertyNames( result ).length === 0 ) {
  //   //   this.$state.go( 'main.notFound' );
  //   // }
  //   return result;
  // }

  closeOnTab( event ) {
    if( event.key === "Enter" || event.key === " ") {
      // $mdMenu.hide();
      let moveToLink = Array.from(document.getElementsByClassName('crs-title'));
      (moveToLink[0] as HTMLElement).focus();
    }
    let menu_item =  Array.from(document.getElementsByClassName('mat-menu-item'));
    if(menu_item.length === 1 && event.key === "Tab") {
      event.preventDefault();
    }
    if( event.key === "Tab" && event.target === menu_item[menu_item.length - 1] && menu_item.length !== 1) {
      (menu_item[menu_item.length - 2] as HTMLElement).focus();
    }
    if(event.shiftKey &&  event.key === "Tab" && event.target === menu_item[0]) {
      (menu_item[1] as HTMLElement).focus();
    }
  }
  
}
export default ( laboratoryComponent );