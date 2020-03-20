

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import MapFactory from "../../map/mapFactory.service";
import ProfileFactory from "../profileFactory.resource";
import {ActivatedRoute, Params} from '@angular/router';
import { Router } from "@angular/router";
import CrsFactory from "../../search/crsFactory.resource";

@Component({
  selector: 'profileIndexComponent',
  template: require ('./index.html')
})

export class profileIndexComponent implements OnInit, OnDestroy {
  objectKeys = Object.keys;
  private crs;
  private siteStatus;
  private marker;
  private styles;
  private rsn;
  private crs_name;
  private sub;
  private subs;
  private subscription;
  private source;
  
  constructor  (private router: Router,
                private route: ActivatedRoute,
                private MapFactory: MapFactory,
                private ProfileFactory: ProfileFactory,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                private CrsFactory: CrsFactory,
                private cd: ChangeDetectorRef ) {
    this.matIconRegistry.addSvgIcon(
      "ic_email",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/ic_email_24px.svg")
    );
  }
  ngOnInit() {
    this.subs = this.CrsFactory.myCrs.subscribe( (crs) => {
      this.crs = crs;
      this.cd.markForCheck();
      this.rsn =
        !( this.crs.related_unfunded === null ) ||
        !( this.crs.related_funded === null );
        this.marker = {
          url: this.MapFactory.getIconPath( this.crs.color ),
          scaledSize: {
            width: 25,
            height: 25
          }
        };
      // If a CRS does not have any funded or protocol-specific networks, set Site Status to 'NIAID Reserve'

      this.siteStatus = function (crs) {
        return (this.crs.color == 'Red')
        ? 'Active'
        : 'NIAID Reserve';
      }  
    });

    this.sub = this.CrsFactory.source.subscribe( (source) => {
      this.source = source;
      if (!this.crs) {
        let that = this;
        var result = {};
        if ( Object.getOwnPropertyNames( result ).length === 0 ) {
        }
      }
    })

    this.subscription = this.router.events.subscribe((url:any) => {
    });
    this.styles = this.MapFactory.mapStyles;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subs.unsubscribe();
    this.sub.unsubscribe();
  }

  legends = function(crs) {
    return this.MapFactory.getIconPath( crs.color );
  };
  
  getCrs = function() {
  }

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

  returnFocus( related_funded ) {
    if (related_funded) {
      let that = this;
      this.router.navigate(['/profile', related_funded.crs_id]);
      this.source.forEach( function( crs ) {
        if ( crs.crs_id == related_funded.crs_id) {
          that.CrsFactory.myCrs.next(crs);
          return;
        }
      });
    }
      this.ProfileFactory.moveFocusBack();
  }
  
  semicolonSplit( names ) {
    if ( !names ) return [];
    return names.split( ';' );
  };
}
export default ( profileIndexComponent );