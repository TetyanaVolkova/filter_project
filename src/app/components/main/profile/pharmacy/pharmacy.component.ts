
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

import CrsFactory from "../../search/crsFactory.resource";

@Component({
  selector: 'pharmacyComponent',
  template: require ('./pharmacy.html')
})

export class pharmacyComponent implements OnInit, OnDestroy {
  private crs;
  // @Input() private source;
  // @Input() private selectedSite;
  private subs;

  constructor  (private CrsFactory: CrsFactory,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer,
                private cd: ChangeDetectorRef) {
    this.matIconRegistry.addSvgIcon(
      "ic_email",
      this.domSanitizer.bypassSecurityTrustResourceUrl("images/ic_email_24px.svg")
    );
  }
  ngOnInit() {
    this.subs = this.CrsFactory.myCrs.subscribe( (crs) => {
      this.crs = crs;
      this.cd.markForCheck();
    });
    // this.crs = this.getCrs();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  // getCrs = function() {
  //   let that = this;
  //   var result = {};
  //   if ( this.selectedSite != null ) {
  //     result = this.selectedSite;
  //     this.selectedSite = null;
  //   } else {
  //     this.source.forEach( function( crs ) {
  //       if ( crs.crs_name == decodeURIComponent( that.$state.params.crs_name )) {
  //         result = crs;
  //       }
  //     });
  //   }
  //   if ( Object.getOwnPropertyNames( result ).length === 0 ) {
  //     this.$state.go( 'main.notFound' );
  //   }
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
export default ( pharmacyComponent );